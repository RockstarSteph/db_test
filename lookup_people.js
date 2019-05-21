

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client
  .connect()
  .then()
  .catch(err => console.log(err))
  .finally(() => console.log('People Database Connected'));

const getArguments = () => {
  const [node, path, firstName] = process.argv;

  return {firstName};
};

// const displayPerson = personObj => {
//   console.log(
//     `${personObj.id}- ${personObj.first_name} ${personObj.last_name}`
//   );
// };

const renderPeople = peopleArr => {
  console.log(`Listing ${peopleArr.length} persons`);
  console.log('-'.repeat(20));

  for (const person of peopleArr) {
    displayPerson(person);
  }
};



const listPeople = () => {
  // Creating the SELECT Query
  const query = {
    text: 'SELECT * from famous_people WHERE first_name = ($1)',
    values: [firstName],
  };

  // Running that query
  client
    .query(query)
    // Getting the result
    .then(res =>  console.log(res.rows[1]['birthdate']))

    // Catching errors
    .catch(err => console.log(err))

    // Closing the connection
    .finally(() => {
      console.log('Query completed.');
      client.end();
    });
};


// Extracting the arguments
const {firstName} = getArguments();
listPeople();
console.log("string");
// switch (command) {
//   case 'c':
//     // Adding a new person in the database
//     if (firstName && lastName) {
//       addPerson({ firstName, lastName });
//     } else {
//       console.log('Please provide a first and last name');
//       client.end();
//     }
//     break;

//   case 'l':
//     listPeople();
//     break;

//   // case 'd':
//   //   deletePerson({firstName, lastName});
//   //   break;

//   default:
//     console.log("Please specify the command, either 'c' or 'l' ");
//     client.end();
// }
