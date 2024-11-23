import inquirer from 'inquirer';
import { pool, connectToDb } from './db/connection.js';

await connectToDb();


function menu() {
  inquirer
    .prompt([
      {
        name: 'departments',
        type: 'list',
        message: 'What would you like to do?',
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
      },
    ])
    .then((response) => {
      switch (response.departments) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        default:
          console.log("Invalid option");
      }
    });
};

// Function to view all departments
function viewAllDepartments() {
  console.log("Displaying all departments...");
  const sql = `SELECT * FROM department`;

  pool.query(sql, (err: Error, result: any) => {
    if (err) {
      console.log(err)
      return;
    }
    const { rows } = result;
    console.table(rows);
    menu();
  });


};

// Function to view all roles
function viewAllRoles() {
  console.log("Displaying all roles...");
  const sql = 'SELECT * FROM role'

  pool.query(sql, (err: Error, result: any) => {
    if (err) {
      console.log(err)
      return;
    }
    const { rows } = result;
    console.table(rows);
    menu();
  });
}

// Function to view all employees
function viewAllEmployees() {
  console.log("Displaying all employees...");

  const sql = 'SELECT * FROM employee'

  pool.query(sql, (err: Error, result: any) => {
    if (err) {
      console.log(err)
      return;
    }
    const { rows } = result;
    console.table(rows);
    menu();
  });
}

// Function to add a new department 
function addDepartment() {
  inquirer.prompt([
    {
      name: 'departmentName',
      type: 'input',
      message: 'Enter the name of the new department:',
    }
  ]).then((answers) => {
    console.log(`Adding department: ${answers.departmentName}`);
    // Logic to insert the new department into the database
    const sql = 'INSERT INTO department (name) VALUES ($1)';

    pool.query(sql, [answers.departmentName],(err: Error, _result: any) => {
      if (err) {
        console.log(err)
        return;
      }
      console.log(`${answers.departmentName} has been added!`);
      menu();
    });
  });
}

// Function to add a new role
function addRole() {
  inquirer.prompt([
    {
      name: 'roleTitle',
      type: 'input',
      message: 'Enter the title of the new role:',
    },
    {
      name: 'roleSalary',
      type: 'input',
      message: 'Enter the salary for the role:',
    },
    {
      name: 'departmentId',
      type: 'input',
      message: 'Enter the department ID for this role:',
    }
  ]).then((answers) => {
    console.log(`Adding role: ${answers.roleTitle} with salary ${answers.roleSalary} in department ID ${answers.departmentId}`);
    // Logic to insert the new role into the database

    const sql = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';

    pool.query(sql, [answers.roleTitle, answers.roleSalary, answers.departmentId],(err: Error, _result: any) => {
      if (err) {
        console.log(err)
        return;
      }
      console.log(`${answers.roleTitle}, ${answers.roleSalary}, & ${answers.departmentId} has been added!`);
      menu();
    });
  });
}

// Function to add a new employee 
function addEmployee() {
  inquirer.prompt([
    {
      name: 'firstName',
      type: 'input',
      message: 'Enter the employee\'s first name:',
    },
    {
      name: 'lastName',
      type: 'input',
      message: 'Enter the employee\'s last name:',
    },
    {
      name: 'roleId',
      type: 'input',
      message: 'Enter the role ID for the employee:',
    },
    {
      name: 'managerId',
      type: 'input',
      message: 'Enter the manager ID for the employee (leave blank if none):',
    }
  ]).then((answers) => {
    console.log(`Adding employee: ${answers.firstName} ${answers.lastName}, Role ID: ${answers.roleId}, Manager ID: ${answers.managerId || 'None'}`);
    // Logic to insert the new employee into the database

    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';

    pool.query(sql, [answers.firstName, answers.lastName, answers.roleId, answers.managerId === "" ? null : answers.managerId],(err: Error, _result: any) => {
      if (err) {
        console.log(err)
        return;
      }
      console.log(`${answers.firstName}, ${answers.lastName}, ${answers.roleId}, & ${answers.managerId},  has been added!`);
      menu();
    });
  });
}

// Function to update an employee's role 
function updateEmployeeRole() {
  inquirer.prompt([
    {
      name: 'employeeId',
      type: 'input',
      message: 'Enter the employee ID you want to update:',
    },
    {
      name: 'newRoleId',
      type: 'input',
      message: 'Enter the new role ID for this employee:',
    }
  ]).then((answers) => {
    console.log(`Updating employee ID ${answers.employeeId} with new role ID ${answers.newRoleId}`);
    // Logic to update the employee's role in the database
  });
}
menu();
