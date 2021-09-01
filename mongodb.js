const { MongoClient, ObjectID } = require("mongodb");

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }
    console.log("Connected correctly");
    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   {
    //     name: "Paige",
    //     age: 3,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Songmi",
    //       age: 39,
    //     },
    //     {
    //       name: "Minho",
    //       age: 38,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert users");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users")
    //   .find({
    //     name: "Minho",
    //   })
    //   .toArray((error, user) => {
    //     console.log(user);
    //   });

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("6003601f6dec5b7714b93e73"),
    //     },
    //     {
    //       // $set: {
    //       //   name: "Mike",
    //       // },
    //       $inc: {
    //         age: 1,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection("users")
    //   .updateMany(
    //     { age: 39 },
    //     {
    //       $set: {
    //         name: "SB",
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result.modifiedCount);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection("users")
    //   .deleteOne({
    //     name: "SB",
    //   })
    //   .then((result) => {
    //     console.log(result.deletedCount);
    //   });

    // db.collection("users")
    //   .deleteMany({
    //     name: "Songmi",
    //   })
    //   .then((result) => {
    //     console.log(result.deletedCount);
    //   });
  }
);
