// addInitialData.ts

import { AuthPlayerInfo, PlayerInfo, StatisticsPlayerInfo } from "../../types";

export function addInitialData(
  DatabaseObj: IDBDatabase,
  authPlayersInfo: AuthPlayerInfo[],
  playersInfo: PlayerInfo[],
  playersStatistics: StatisticsPlayerInfo[]
) {
  // Add data to the authentication-store
  const authTransaction = DatabaseObj.transaction(
    "authentication-store",
    "readwrite"
  );
  const authStore = authTransaction.objectStore("authentication-store");
  authPlayersInfo.forEach((user) => {
    const request = authStore.add(user);
    request.onsuccess = () => {
      console.log(`Item added to authentication-store:`, user);
    };
    request.onerror = (event) => {
      console.error(`Error adding item to authentication-store`, event);
    };
  });

  // Add data to the user-info-store
  const userInfoTransaction = DatabaseObj.transaction(
    "user-info-store",
    "readwrite"
  );
  const userInfoStore = userInfoTransaction.objectStore("user-info-store");
  playersInfo.forEach((user) => {
    const request = userInfoStore.add(user);
    request.onsuccess = () => {
      console.log(`Item added to user-info-store:`, user);
    };
    request.onerror = (event) => {
      console.error(`Error adding item to user-info-store`, event);
    };
  });

  // Add data to the statistics-store
  const statisticsTransaction = DatabaseObj.transaction(
    "statistics-store",
    "readwrite"
  );
  const statisticsStore = statisticsTransaction.objectStore("statistics-store");
  playersStatistics.forEach((user) => {
    const request = statisticsStore.add(user);
    request.onsuccess = () => {
      console.log(`Item added to statistics-store:`, user);
    };
    request.onerror = (event) => {
      console.error(`Error adding item to statistics-store`, event);
    };
  });

  // Handle transaction completions
  authTransaction.oncomplete = () => {
    console.log("All data added to authentication-store successfully.");
  };
  userInfoTransaction.oncomplete = () => {
    console.log("All data added to user-info-store successfully.");
  };
  statisticsTransaction.oncomplete = () => {
    console.log("All data added to statistics-store successfully.");
  };

  // Handle transaction errors
  authTransaction.onerror = (event) => {
    console.error("Transaction error on authentication-store", event);
  };
  userInfoTransaction.onerror = (event) => {
    console.error("Transaction error on user-info-store", event);
  };
  statisticsTransaction.onerror = (event) => {
    console.error("Transaction error on statistics-store", event);
  };
}
