const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
console.log("outputPath:" + outputPath);

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const teamMembers = [];

promptManager();

function promptManager() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Hello, Manager! Please enter your name:",
        name: "name",
      },
      {
        type: "input",
        message: "What is your manager's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber",
      },
    ])
    .then((answers) => {
      console.log({ answers });

      const { name, id, email, officeNumber } = answers;

      const newManager = new Manager(name, id, email, officeNumber);

      teamMembers.push(newManager);

      addTeamMember();
    });
}

function addTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Would you like to add another employee?",
        choices: ["Engineer", "Intern", "Done"],
      },
    ])
    .then((answers) => {
      console.log({ teamMembers });

      switch (answers.role) {
        case "Engineer":
          promptEngineer();
          break;

        case "Intern":
          promptIntern();
          break;

        case "Done":
        default:
          buildTeamPage();
      }
    });
}

function buildTeamPage() {
  console.log(render(teamMembers));

  // use fs to write file to output folder
  fs.writeFileSync(outputPath, render(teamMembers), "utf8");
}

//Prompts for engineer's name, id, email and github
function promptEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your engineer's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your engineer's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your engineer's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your engineer's GitHub username",
        name: "github",
      },
    ])
    .then((answers) => {
      console.log({ answers });

      const { name, id, email, github } = answers;

      const newEngineer = new Engineer(name, id, email, github);

      // Save new engineer's info to the teamMembers array
      teamMembers.push(newEngineer);

      addTeamMember();
    });
}

//Prompts for intern's name, id, email and school
function promptIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your intern's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your intern's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your intern's school?",
        name: "school",
      },
    ])
    .then((answers) => {
      console.log({ answers });

      const { name, id, email, school } = answers;

      const newIntern = new Intern(name, id, email, school);

      // Save new intern's info to the teamMembers array
      teamMembers.push(newIntern);

      addTeamMember();
    });
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
