INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Human Resources');

INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 75000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 65000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Alice', 'Smith', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Johnson', 2, 1);
