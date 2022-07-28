DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id: INTEGER AUTO_INCREMENT PRIMARY KEY,
  title: VARCHAR(30) NOT NULL,
  salary: DECIMAL NOT NULL,
  department_id: INTEGER,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(dep_id) ON DELETE SET NULL
);

CREATE TABLE employees (
  id: INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name: VARCHAR(30) NOT NULL,
  last_name: VARCHAR(30) NOT NULL,
  role_id: INTEGER,
  manager_id: INTEGER,
      CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
      CONSTRAINT fk_roles FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE SET NULL
);