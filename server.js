const mysql = require("mysql2");
const db = require("./db/connection");
const cTable = require("console.table");
const inquirer = require("inquirer");

const userPrompt = () => {
  console.log(`=========== Welcome to Staff-Track! ===========`);
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Please choose an action.",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((choice) => {
      const { choices } = choice;
      if (choices === "View all departments") {
        viewDepartments();
      }
      if (choices === "View all roles") {
        viewRoles();
      }
      if (choices === "View all employees") {
        viewEmployees();
      }
      if (choices === "Add a department") {
        addDepartment();
      }
      if (choices === "Add a role") {
        addRole();
      }
      if (choices === "Add an employee") {
        addEmployee();
      }
      if (choices === "Update an employee role") {
        updateEmployee();
      }
      if (choices === "Exit") {
        db.end(
          console.log(`=========== Goodbye! See you next time ===========`)
        );
      }
    });
};

viewDepartments = () => {
  db.query(`SELECT * FROM department`, (err, result) => {
      if (err) {
          console.log(err)
      }
      console.table(result)
      userPrompt();
  })
};

viewRoles = () => {
  db.query(`SELECT * FROM roles`, (err, result) => {
      if (err) {
          console.log(err)
      }
      console.table(result)
      userPrompt();
  })
};

viewEmployees = () => {
  db.query(`SELECT * FROM employees JOIN roles WHERE employees.role_id = roles.roles_id`, (err, result) => {
      if (err) {
          console.log(err)
      }
      console.table(result)
      userPrompt();
  })
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDpt",
        message: "Please enter a new department name.",
      },
    ])
    .then((input) => {
      const sql = `INSERT INTO department (dep_name)
                  VALUES (?)`;
      db.query(sql, input.addDpt, (err, result) => {
        if (err) throw err;
        console.log(`Successfully added ${input.addDpt} to departments.`);
        viewDepartments();
      });
    });
};

addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRole",
        message: "Please enter a new role.",
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter a salary for this role.",
      },
    ])
    .then((input) => {
      const params = [input.addRole, input.salary];
      const role_sql = `SELECT dep_name, dep_id FROM department`;
      db.query(role_sql, (err, data) => {
        if (err) throw err;
        const dpt = data.map(({ dep_name, dep_id }) => ({ name: dep_name, value: dep_id }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "dpt",
              message: "Please choose a department for this role.",
              choices: dpt,
            },
          ])
          .then((input) => {
            const dpt = input.dpt;
            params.push(dpt);
            const sql = `INSERT INTO roles (role_title, role_salary, dep_id)
                                    VALUES (?, ?, ?)`;
            db.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log(`Added ${input.role} to roles!`);
              viewRoles();
            });
          });
      });
    });
};

addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter a first name for this employee.",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter a last name for this employee.",
      },
    ])
    .then((input) => {
      const params = [input.first_name, input.last_name];
      const assign_role = `SELECT roles.roles_id, roles.role_title FROM roles`;
      db.query(assign_role, (err, data) => {
        if (err) throw err;
        const roles = data.map(({ roles_id, role_title }) => ({ name: role_title, value: roles_id }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "assignRole",
              message: "Please select a role for this employee.",
              choices: roles,
            },
          ])
          .then((input) => {
            const role = input.assignRole;
            params.push(role);
            const assign_manager = `SELECT * FROM employees`;
            db.query(assign_manager, (err, data) => {
              if (err) throw err;
              const managers = data.map(({ employee_id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: employee_id,
              }));
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "selectManager",
                    message: "Please select a manager for this employee.",
                    choices: managers,
                  },
                ])
                .then((input) => {
                  const manager = input.selectManager;
                  params.push(manager);
                  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                  db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log(`Employee added.`);
                    viewEmployees();
                  });
                });
            });
          });
      });
    });
};

updateEmployee = () => {
  const employee_sql = `SELECT * FROM employees`;
  db.query(employee_sql, (err, data) => {
      if (err) throw err;
      const employees = data.map(({ employee_id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: employee_id }));
      inquirer.prompt([
          {
              type: 'list',
              name: 'employeeSelect',
              message: 'Please select an employee to update.',
              choices: employees
          }
      ])
          .then(input => {
              const employees = input.employeeSelect;
              const params = [];
              params.push(employees);
              const role_sql = `SELECT * FROM roles`;
              db.query(role_sql, (err, data) => {
                  if (err) throw err;
                  const roles = data.map(({ roles_id, role_title }) => ({ name: role_title, value: roles_id }));
                  inquirer.prompt([
                      {
                          type: 'list',
                          name: 'updateRole',
                          message: 'Please select a new role for this employee.',
                          choices: roles
                      }
                  ])
                      .then(input => {
                          const newRole = input.updateRole;
                          params.push(newRole);
                          var employees = params[0]
                          params[0] = newRole
                          params[1] = employees
                          const sql = `UPDATE employees SET role_id = ? WHERE employee_id = ?`
                          db.query(sql, params, (err, result) => {
                              if (err) throw err;
                              console.log('Employee updated.')
                              viewEmployees();
          });
        });
      });
    });
  });
};
//Starts the Inquirer package and the program 
userPrompt();

db.connect((err) => {
  if (err) throw err;
  console.log("Database connection successful.");
});
