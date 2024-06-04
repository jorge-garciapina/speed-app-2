import { LoginCredentialsType, RegisterCredentialsType } from "../types";

import { LoginInfoType } from "../types";
import {
  authPlayersInfo,
  playersInfo,
  playersStatistics,
} from "../general-store/test-initial-values";

const databaseSingleton = (function () {
  //////////////////////////////////////////////////////////////////
  // Now that I understand the IndexDB structure it is time to build the missing logic.
  // STEP 1: Create the object store
  // Call the -->open<-- method of the  IndexedDb to open the db or create it:
  // Let us open our database
  const databaseName = "speedTypingDB4";
  const OpenDBRequestObj: IDBOpenDBRequest = window.indexedDB.open(
    databaseName,
    1
  );

  // Use to manually delete a database:
  // window.indexedDB.deleteDatabase("speedTypingDB9");

  let DatabaseObj: IDBDatabase | null = null;

  // It is important to remember that according to the documentation: https://developer.mozilla.org/en-US/docs/Web/API/IDBOpenDBRequest
  // The -->IDBOpenDBRequest<--:
  //   1 - EventTarget <== IDBRequest <== IDBOpenDBRequest
  //   2 - No methods, but inherits methods from -->EventTarget<--
  //   3 - Events:
  //          + Events defined on parent interfaces, -->IDBRequest<-- and -->EventTarget<--, can also be dispatched on
  //            -->IDBOpenDBRequest<-- objects.
  //               Note: In this part it is important to consider that the -->IDBRequest<-- by default! contains the events:
  //                     * error:
  //                         Fired when an error caused a request to fail.
  //                     * success:
  //                         Fired when an IDBRequest succeeds.
  //          + Events build for the -->IDBOpenDBRequest<-- interface:
  //               * blocked
  //                   Fired when an open connection to a database is blocking a versionchange transaction on the same database.
  //                   Also available via the onblocked property.
  //               * upgradeneeded
  //                   Fired when an attempt was made to open a database with a version number higher than its current version.
  //                   Also available via the onupgradeneeded property.
  // That makes evident that we need to handle -->error<-- and -->success<-- just as any other -->IDBRequest<-- to see if the
  // operation for creation, deletion or identification of the database succeded or failed:
  //----------------------------
  // The code of --->OpenDBRequestObj.onupgradeneeded<--- executes before --->OpenDBRequestObj.onsuccess<---
  // We create the database for the initial version
  OpenDBRequestObj.onupgradeneeded = (event) => {
    // IN THIS PART THE CODE CONDIGURES THE DATABASE CREATION. IT DEFINES THE INITIAL PARAMETERS
    // CONTAINED BY THE DIFFERENT OBJECT STORES
    //   *SO FAR I AM USING TEST DATA TO POPULATE THE OBJECT STORES, I NEED TO REMOVE THAT WHEN DATABASE IS READY*
    // And also, we need a onupgradeneeded:
    //     "When you:
    //        - create a new database
    //        - increase the version number of an existing database (by specifying a higher version number
    //          than you did previously, when Opening a database),
    //      the onupgradeneeded" event will be triggered and an IDBVersionChangeEvent object will be passed
    //      to any onversionchange event handler set up
    ///////////////////////////////////////////////
    // For this version, I am using this logic when databases are created
    // I will create a database named -->speedTypingDB<-- and in that I will put the object stores:
    //   1 - userCredentials
    //   2 - gameStatistics
    DatabaseObj = event.target?.result;

    // test if it is working as expected:
    console.log("TESTING onupgradeneeded", event.target?.result);

    // Now the code creates the stores in the database
    ////////////////////////////////////////////////////
    // AUTHENTICATION STORE:
    // STEP 1: Create the object store
    const authenticationStore = DatabaseObj!.createObjectStore(
      "authentication-store",
      {
        keyPath: "email",
      }
    );

    // STEP 2: Create the indeces for this object store:
    authenticationStore.createIndex("email", "email", { unique: true });
    authenticationStore.createIndex("hashedPassword", "hashedPassword", {
      unique: false,
    });

    // STEP 4: Create the transaction to save the test data on the database
    authenticationStore.transaction.oncomplete = () => {
      // Store values in the newly created objectStore.
      const customerObjectStore = DatabaseObj!
        .transaction("authentication-store", "readwrite")
        .objectStore("authentication-store");
      authPlayersInfo.forEach((user) => {
        customerObjectStore.add(user);
      });
    };

    ////////////////////////////////////////////////////
    // USER INFO STORE:
    // STEP 1: Create the object store
    const userInfoStore = DatabaseObj!.createObjectStore("user-info-store", {
      keyPath: "email",
    });

    // STEP 2: Create the indeces for this object store:
    userInfoStore.createIndex("email", "email", { unique: true });
    userInfoStore.createIndex("name", "name", { unique: false });
    userInfoStore.createIndex("avatar", "avatar", { unique: false });

    // STEP 3: Create the transaction to save the test data on the database
    userInfoStore.transaction.oncomplete = () => {
      // Store values in the newly created objectStore.
      const customerObjectStore = DatabaseObj!
        .transaction("user-info-store", "readwrite")
        .objectStore("user-info-store");
      playersInfo.forEach((user) => {
        customerObjectStore.add(user);
      });
    };

    ////////////////////////////////////////////////////
    // STATISTICS STORE:
    // STEP 1: Create the object store
    const statisticsStore = DatabaseObj!.createObjectStore("statistics-store", {
      keyPath: "email",
    });

    // STEP 2: Create the indeces for this object store:
    statisticsStore.createIndex("email", "email", { unique: true });
    statisticsStore.createIndex("playersStatistics", "playersStatistics", {
      unique: false,
    });

    // STEP 3: Define some test data to add into the database:
    // This step requires to make some changes, and the reason for that is:
    // --->playersStatistics<--- is the the one with type -->InputStatisticsType<--
    // stored in the state.

    // STEP 4: Create the transaction to save the test data on the database
    statisticsStore.transaction.oncomplete = () => {
      // Store values in the newly created objectStore.
      const customerObjectStore = DatabaseObj!
        .transaction("statistics-store", "readwrite")
        .objectStore("statistics-store");
      playersStatistics.forEach((user) => {
        customerObjectStore.add(user);
      });
    };

    OpenDBRequestObj.onerror = () => {
      console.error("Error implementing operation");
    };

    OpenDBRequestObj.onsuccess = () => {
      console.log("CONNECTION SUCCESSFUL");
      // update the -->DatabaseObj<-- variable to have a reference to it
      console.log("Data base: ", DatabaseObj);
    };

    //////////////////
  };

  // It seems that I need to make a test to adding elements in the database.
  // Objective: 1 to test the adding abilities and 2 to see how keyPAth works in action
  // credentialsStore.createIndex("email", "email", { unique: true });
  // statisticsStore.createIndex("email", "email", { unique: true });
  // ADDING INFORMATION:
  // To add the information, it is important to remember what was said in the literature:
  // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
  //   + "Before you can do anything with your new database, you need to start a transaction."
  //   + "Transactions only let you have an object store that you specified when creating the transaction"

  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STEP 2: In the case the database named -->databaseName<-- needs to be created, then
  //         the code creates it

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  function login({ userID, password }: LoginCredentialsType): LoginInfoType {
    console.log(
      "LOGIN IN DATABASE SINGLETON",
      "userID: ",
      userID,
      "password",
      password
    );
    return {
      name: "validatedUser",
      email: "validatedEmail",
      avatar: "avatar",
    };
  }

  function register({
    userName,
    userEmail,
    password,
    userAvatar,
  }: RegisterCredentialsType): LoginInfoType {
    console.log(
      "REGISTER IN DATABASE SINGLETON",
      "userName: ",
      userName,
      "userAvatar: ",
      userAvatar,
      "userEmail: ",
      userEmail,
      "password",
      password
    );
    return {
      name: "validatedUser",
      email: "validatedEmail",
      avatar: "avatar",
    };
  }

  function verifyAvailableName(name: string): boolean {
    console.log("AVAILABLE NAME IN DATABASE SINGLETON", "NAME:", name);

    return true;
  }

  // function updateUserStatistics(){}

  return {
    // the first value to isExecuting is false
    login: function ({ userID, password }: LoginCredentialsType) {
      return login({ userID, password });
    },

    register: function ({
      userName,
      userEmail,
      password,
      userAvatar,
    }: RegisterCredentialsType) {
      return register({ userName, userEmail, password, userAvatar });
    },

    verifyAvailableName: function (name: string) {
      return verifyAvailableName(name);
    },
  };
})();

// Check this example implementations for guide:
// console.log(databaseSingleton());
// console.log(databaseSingleton());
// console.log(databaseSingleton());
// console.log(databaseSingleton());
export default databaseSingleton;
