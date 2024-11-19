import inquirer from 'inquirer';

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
      
 
      // Function to view all departments (Acceptance Criteria)
      function viewAllDepartments() {
        console.log("Displaying all departments...");
        // Logic to fetch and display departments with their IDs from the database goes here
      }
      
      // Function to view all roles (Acceptance Criteria)
      function viewAllRoles() {
        console.log("Displaying all roles...");
        // Logic to fetch and display roles with job titles, role IDs, departments, and salaries
      }
      
      // Function to view all employees (Acceptance Criteria)
      function viewAllEmployees() {
        console.log("Displaying all employees...");
        // Logic to fetch and display employees with all relevant info, including manager data
      }
      
      // Function to add a new department (Acceptance Criteria)
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
        });
      }
      
      // Function to add a new role (Acceptance Criteria)
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
        });
      }
      
      // Function to add a new employee (Acceptance Criteria)
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
        });
      }
      
      // Function to update an employee's role (Acceptance Criteria)
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