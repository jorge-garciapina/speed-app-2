//////////////////////////////////////////////////////////////////
// CONFIGURING THE EXAMPLE INDEXDB:
let IDBDatabase;
const IDBOpenDBRequest = indexedDB.open("the_name");

// At this point: (considering IDBRequest inherit properties)
// readyState ='pending'

// When readyState ='done':
// (Consider that this is done asynchronously, not confused with the order that the code is written)
// "every request returns a result and an error, and an event is fired on the request."
// And we have to create the logic to handle the error and success events:
IDBOpenDBRequest.addEventListener("error", (event) => {
  //TODO: CREATE THE APPROPIATE LOGIC TO HANDLE THE ERROR
  console.log("ERROR open: ", event);
  // ERROR
});

IDBOpenDBRequest.addEventListener("success", (event) => {
  console.log("SUCCESS open: ", event);

  //TODO: Ask how to solve this ts error. I want to move on.
  IDBDatabase = event.target?.result;

  console.log(IDBDatabase);
  // SUCCESS
});

// The good thing from the last piece of code is that we now have the IDBDatabase to execute
// the transactions to "create, manipulate, and delete objects (data) in that database."

// TODO: again, I need to solve this ts errors
// IDBDatabase.addEventListener("error", (event: ErrorEvent) => {
//   // Generic error handler for all errors targeted at this database's
//   // requests!
//   console.log(`IDBDatabase error: ${event.target?.errorCode}`);
// });
/////////////////
// IDBDatabase.onerror = (event) => {
//   // Generic error handler for all errors targeted at this database's
//   // requests!
//   console.error(`Database error: ${event.target.errorCode}`);
// };

/////////////////////////////
// So far, the code has not changed with the version of the IDBDatabase
// The example continues:
// -
// ... When you create a new database or increase the version number of an existing database
//     (by specifying a higher version number than you did previously, when Opening a database),
// -
// ... the --->onupgradeneeded<--- event will be triggered
// -
// ... and an --->IDBVersionChangeEvent<--- object will be passed to any --->onversionchange<---
//     event handler set up on request.result (i.e., db in the example).
// -
// ... In the handler for the upgradeneeded event, you should create the object stores needed for
//     this version of the database:

// The previous discussion makes evident why is it necessary to implement this:
// It will create the structure for the database
IDBOpenDBRequest.onupgradeneeded = (event) => {
  // Save the IDBDatabase interface
  const IDBDatabase = event.target?.result;

  // Create an objectStore for this database
  const objectStore = IDBDatabase.createObjectStore("name", {
    keyPath: "myKey",
  });
};

// - IndexedDB uses "object stores" rather than tables, and a single database can
//   contain any number of object stores
// o-o
// - Whenever a value is stored in an object store, it is associated with a key.
// o-o
// - There are several different ways that a key can be supplied depending on
//   whether the object store uses a key path or a key generator.

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
