  // This is what our customer data looks like.
  const customerData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
  ];

  const customerData1 = [
    {
      // ssn: "444-44-4444",
      ssn: "666-66-6666",
      name: "Harvey",
      age: 35,
      email: "Harvey@company.com",
    },
    { ssn: "777-77-7777", name: "Mike", age: 32, email: "Mike@home.org" },
  ];

  const dbName = "the_name";

  const request = indexedDB.open(dbName, 2);

  request.onerror = () => {
    // Handle errors.
  };

  request.onsuccess = (event) => {
    console.log("CONNECTED");

    const db = event.target?.result;

    db.onerror = (event) => {
      // In this part the code handles "general errors", errors that are not related
      // to the transactions given by the code
      // console.error("DATABASE ERROR");
      // console.error(`DATABASE ERROR`, event);
    };

    const transaction = db.transaction(["customers"], "readwrite");

    // Do something when all the data is added to the database.
    transaction.oncomplete = (event) => {
      console.log("All done!");
    };

    transaction.onerror = (event) => {
      // Don't forget to handle errors!
      console.log("ON THE TRANSACTION", event.target.error);

      // console.error(`Database error: ${event}`);
    };

    const trans1 = db.transaction("customers", "readwrite");
    const objectStore1 = trans1.objectStore("customers");
    objectStore1.add({
      ssn: "888-88-8888",
      name: "Salma",
      age: 35,
      email: "Salma@company.com",
    });

    trans1.onerror = (event) => {
      // Don't forget to handle errors!
      console.log("ON THE trans1", event.target.error);

      // console.error(`Database error: ${event}`);
    };

    // const objectStore = transaction.objectStore("customers");
    // customerData1.forEach((customer) => {
    //   const request = objectStore.add(customer);
    //   request.onsuccess = (event) => {
    //     // event.target.result === customer.ssn;
    //   };
    // });
  };

  request.onupgradeneeded = (event) => {
    const db = event.target?.result;

    // Create an objectStore to hold information about our customers. We're
    // going to use "ssn" as our key path because it's guaranteed to be
    // unique - or at least that's what I was told during the kickoff meeting.
    const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

    // Create an index to search customers by name. We may have duplicates
    // so we can't use a unique index.
    objectStore.createIndex("name", "name", { unique: false });

    // Create an index to search customers by email. We want to ensure that
    // no two customers have the same email, so use a unique index.
    objectStore.createIndex("email", "email", { unique: true });

    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    objectStore.transaction.oncomplete = () => {
      console.log("DATA ADDED");
      // Store values in the newly created objectStore.
      const customerObjectStore = db
        .transaction("customers", "readwrite")
        .objectStore("customers");
      customerData.forEach((customer) => {
        customerObjectStore.add(customer);
      });
    };

    // The transaction() function takes two arguments (though one is optional)
    // and returns a transaction object