INSERT INTO department (department_name)
VALUES
('Sales'),
('Recruiting'),
('Business Analytics'),
('Financing'),
('Human Resources');

INSERT INTO roles(title, salary, department_id)
VALUES
("Junior Salesman", 40000, 1),
("Senior Salesman", 100000, 1),
("Recruiting Specialist", 65000, 2),
("Recruiting Lead", 80000, 2),
("Business Solutions Expert", 70000, 3),
("Business Manager", 85000, 3),
("Accountant", 70000, 4),
("Senior Accountant", 80000, 4),
("Human Resources Intern", 15, 5),
("Human Resources Associate", 70000, 5),
("Human Resources Supervisor", 90000, 5);

INSERT INTO employee (first_name, last_name, roles_id, manager_id )
VALUES
("Will", "Smith", 2 , NULL),
("Harrison", "Ford", 4, 3),
("Angelina", "Jolie", 7, 2),
("Julie", "Roberts", 10, 1),
("Ben", "Affleck", 1, 1),
("Danny", "Devito", 11, NULL);
