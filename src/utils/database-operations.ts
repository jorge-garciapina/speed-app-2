import { LoginCredentialsType, RegisterCredentialsType } from "../types";

import bcrypt from "bcryptjs";

const databaseSingleton = (function () {
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  // Now that I understand the IndexDB structure it is time to build the missing logic.
  // STEP 1: Create the object store
  // Call the -->open<-- method of the IndexedDb to open the db or create it:
  // Let us open our database
  const databaseName = "speedTypingDB2";
  const OpenDBRequestObj: IDBOpenDBRequest = window.indexedDB.open(
    databaseName,
    1
  );

  // Use to manually delete a database:
  // window.indexedDB.deleteDatabase("speedTypingDB2");

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
  // operation for creation, deletion or identification of the database succeeded or failed:
  //----------------------------
  // The code of --->OpenDBRequestObj.onupgradeneeded<--- executes before --->OpenDBRequestObj.onsuccess<---
  // We create the database for the initial version
  OpenDBRequestObj.onupgradeneeded = (event) => {
    const dbRequest = event.target as IDBOpenDBRequest;
    // IN THIS PART THE CODE CONFIGURES THE DATABASE CREATION. IT DEFINES THE INITIAL PARAMETERS
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
    DatabaseObj = dbRequest.result;

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

    // STEP 2: Create the indices for this object store:
    authenticationStore.createIndex("email", "email", { unique: true });
    authenticationStore.createIndex("hashedPassword", "hashedPassword", {
      unique: false,
    });

    ////////////////////////////////////////////////////
    // USER INFO STORE:
    // STEP 1: Create the object store
    const userInfoStore = DatabaseObj!.createObjectStore("user-info-store", {
      keyPath: "email",
    });

    // STEP 2: Create the indices for this object store:
    userInfoStore.createIndex("email", "email", { unique: true });
    userInfoStore.createIndex("name", "name", { unique: false });
    userInfoStore.createIndex("avatar", "avatar", { unique: false });

    ////////////////////////////////////////////////////
    // STATISTICS STORE:
    // STEP 1: Create the object store
    const statisticsStore = DatabaseObj!.createObjectStore("statistics-store", {
      keyPath: "email",
    });

    // STEP 2: Create the indices for this object store:
    statisticsStore.createIndex("email", "email", { unique: true });
    statisticsStore.createIndex("playersStatistics", "playersStatistics", {
      unique: false,
    });
  };

  // Handle the error event
  OpenDBRequestObj.onerror = () => {
    console.error("Error implementing operation");
  };

  // Handle the success event
  OpenDBRequestObj.onsuccess = () => {
    DatabaseObj = OpenDBRequestObj.result;
    // update the -->DatabaseObj<-- variable to have a reference to it

    // addInitialData(
    //   DatabaseObj,
    //   authPlayersInfo,
    //   playersInfo,
    //   playersStatistics
    // );
  };

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////
  async function login({ userID, password }: LoginCredentialsType): Promise<{
    success: boolean;
    message: string;
    userEmail?: string;
    userAvatar?: string;
    userName?: string;
  }> {
    return new Promise((resolve, reject) => {
      if (!DatabaseObj) {
        reject({ success: false, message: "Database is not initialized." });
        return;
      }

      const transaction = DatabaseObj.transaction(
        ["authentication-store", "user-info-store"],
        "readonly"
      );

      const authStore = transaction.objectStore("authentication-store");
      const userInfoStore = transaction.objectStore("user-info-store");

      const authRequest = authStore.get(userID as string);
      const userInfoRequest = userInfoStore.get(userID as string);

      authRequest.onsuccess = async () => {
        if (authRequest.result) {
          const passwordMatch = await bcrypt.compare(
            password as string,
            authRequest.result.hashedPassword
          );

          if (passwordMatch) {
            userInfoRequest.onsuccess = () => {
              if (userInfoRequest.result) {
                resolve({
                  success: true,
                  message: "Login successful",
                  userEmail: authRequest.result.email,
                  userAvatar: userInfoRequest.result.name,
                  userName: userInfoRequest.result.avatar,
                });
              } else {
                resolve({
                  success: true,
                  message: "Login successful, but user info not found",
                  userEmail: authRequest.result.email,
                });
              }
            };

            userInfoRequest.onerror = (event) => {
              reject({
                success: false,
                message: `Error retrieving user info for ${userID}: ${event}`,
              });
            };
          } else {
            resolve({
              success: false,
              message: "Incorrect userID or password",
            });
          }
        } else {
          resolve({ success: false, message: "Incorrect userID or password" });
        }
      };

      authRequest.onerror = (event) => {
        reject({
          success: false,
          message: `Error during login for user ${userID}: ${event}`,
        });
      };
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  async function register({
    userName,
    userEmail,
    password,
    userAvatar,
  }: RegisterCredentialsType): Promise<{
    success: boolean;
    message: string;
    userEmail?: string;
    userAvatar?: string;
    userName?: string;
  } | null> {
    try {
      const emailExists = await checkEmailExists(userEmail!);
      if (emailExists) {
        return {
          success: false,
          message: `Email ${userEmail} already exists.`,
        };
      }

      if (!DatabaseObj) {
        throw new Error("Database is not initialized.");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password as string, 10);

      return new Promise((resolve, reject) => {
        const transaction = DatabaseObj!.transaction(
          ["authentication-store", "user-info-store", "statistics-store"],
          "readwrite"
        );

        const authStore = transaction.objectStore("authentication-store");
        const userInfoStore = transaction.objectStore("user-info-store");
        const statisticsStore = transaction.objectStore("statistics-store");

        const authRequest = authStore.add({
          email: userEmail,
          hashedPassword: hashedPassword, // Store the hashed password
        });
        const userInfoRequest = userInfoStore.add({
          email: userEmail,
          name: userName,
          avatar: userAvatar,
        });

        const statisticsRequest = statisticsStore.add({
          email: userEmail,
          playersStatistics: "",
        });

        transaction.oncomplete = () => {
          resolve({
            success: true,
            message: `User ${userEmail} registered successfully.`,
            userAvatar,
            userEmail,
            userName,
          });
        };

        transaction.onerror = () => {
          reject({ success: false, message: "Transaction error" });
        };

        authRequest.onerror = () => {
          reject({
            success: false,
            message: `Auth store add error for ${userEmail}`,
          });
        };

        userInfoRequest.onerror = () => {
          reject({
            success: false,
            message: `User info store add error for ${userEmail}`,
          });
        };

        statisticsRequest.onerror = () => {
          reject({
            success: false,
            message: `Statistics store add error for ${userEmail}`,
          });
        };
      });
    } catch (error) {
      return {
        success: false,
        message: `Error during registration: ${error}`,
      };
    }
  }
  async function checkEmailExists(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!DatabaseObj) {
        console.error("Database is not initialized.");
        reject(new Error("Database is not initialized."));
        return;
      }

      const transaction = DatabaseObj.transaction(
        "authentication-store",
        "readonly"
      );
      const store = transaction.objectStore("authentication-store");
      const request = store.get(email);

      request.onsuccess = () => {
        // console.log(request.result);
        if (request.result) {
          resolve(true); // Email exists
        } else {
          resolve(false); // Email does not exist
        }
      };

      request.onerror = (event) => {
        console.error(`Error checking email ${email}:`, event);
        reject(new Error(`Error checking email ${email}`));
      };
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  async function saveUserGameData({
    email,
    newGameInfoData,
  }: {
    email: string;
    newGameInfoData: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!DatabaseObj) {
        console.error("Database is not initialized.");
        reject(new Error("Database is not initialized."));
        return;
      }

      const transaction = DatabaseObj.transaction(
        "statistics-store",
        "readwrite"
      );
      const store = transaction.objectStore("statistics-store");
      const request = store.get(email);

      request.onsuccess = (event) => {
        const data = (event.target as IDBRequest).result;
        let playersStatistics = data.playersStatistics;

        const parsedNewGameInfoData = JSON.parse(newGameInfoData);

        if (!playersStatistics) {
          // console.log("empty");

          // If this condition is met then make the playersStatistics = newGameInfoData, save and return some OK message
          playersStatistics = newGameInfoData;

          const updateRequest = store.put({ ...data, playersStatistics });

          updateRequest.onsuccess = () => {
            // console.log("playersStatistics updated successfully.");
            resolve();
          };

          updateRequest.onerror = (updateEvent) => {
            console.error(
              `Error updating statistics for ${email}:`,
              updateEvent
            );
            reject(new Error(`Error updating statistics for ${email}`));
          };
        } else {
          const parsedPlayersStatistics = JSON.parse(playersStatistics);

          // Update the values of "totalErrors" and "totalSuccess"
          parsedPlayersStatistics.totalErrors +=
            parsedNewGameInfoData.totalErrors;
          parsedPlayersStatistics.totalSuccess +=
            parsedNewGameInfoData.totalSuccess;

          // Calculate the updated accuracy
          parsedPlayersStatistics.accuracy =
            parsedPlayersStatistics.totalSuccess /
            (parsedPlayersStatistics.totalErrors +
              parsedPlayersStatistics.totalSuccess);

          // Update the averageSpeed
          parsedPlayersStatistics.averageSpeed =
            (parsedPlayersStatistics.averageSpeed +
              parsedNewGameInfoData.averageSpeed) /
            2;

          // Update the maxSpeed
          parsedPlayersStatistics.maxSpeed = Math.max(
            parsedPlayersStatistics.maxSpeed,
            parsedNewGameInfoData.maxSpeed
          );

          // Stringify the updated playersStatistics
          playersStatistics = JSON.stringify(parsedPlayersStatistics);

          const updateRequest = store.put({ ...data, playersStatistics });

          updateRequest.onsuccess = () => {
            // console.log("playersStatistics updated successfully.");
            // console.log(playersStatistics);
            resolve();
          };

          updateRequest.onerror = (updateEvent) => {
            console.error(
              `Error updating statistics for ${email}:`,
              updateEvent
            );
            reject(new Error(`Error updating statistics for ${email}`));
          };
        }
      };

      request.onerror = (event) => {
        console.error(`Error retrieving statistics for ${email}:`, event);
        reject(new Error(`Error retrieving statistics for ${email}`));
      };
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  async function getUserGameData({ email }: { email: string }): Promise<{
    success: boolean;
    message: string;
    data?: string; // Adjust the type of `data` based on your actual data structure
  }> {
    return new Promise((resolve, reject) => {
      if (!DatabaseObj) {
        console.error("Database is not initialized.");
        reject({
          success: false,
          message: "Database is not initialized.",
        });
        return;
      }

      const transaction = DatabaseObj.transaction(
        "statistics-store",
        "readonly"
      );
      const store = transaction.objectStore("statistics-store");
      const request = store.get(email);

      request.onsuccess = (event) => {
        const data = (event.target as IDBRequest).result;

        if (!data) {
          resolve({
            success: false,
            message: `No data found for email ${email}`,
          });
        } else {
          // const playersStatistics = JSON.parse(data.playersStatistics);
          resolve({
            success: true,
            message: `Data retrieved successfully for email ${email}`,
            // data: playersStatistics,
            data: data.playersStatistics,
          });
        }
      };

      request.onerror = (event) => {
        console.error(`Error retrieving statistics for ${email}:`, event);
        reject({
          success: false,
          message: `Error retrieving statistics for ${email}`,
        });
      };
    });
  }

  //////////////////////////////////////////////////
  return {
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

    saveUserGameData: function ({
      email,
      newGameInfoData,
    }: {
      email: string;
      newGameInfoData: string;
    }) {
      return saveUserGameData({ email, newGameInfoData });
    },

    getUserGameData: function ({ email }: { email: string }) {
      return getUserGameData({ email });
    },

    checkEmailExists: function (email: string) {
      return checkEmailExists(email);
    },
  };
})();

export default databaseSingleton;
