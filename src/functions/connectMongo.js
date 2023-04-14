const mongoose = require("mongoose");

module.exports = (client) => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.mongo_uri);

  mongoose.connection.on("open", () =>
    console.log("Baza de date a fost conectata")
  );
  mongoose.connection.on("disconnected", () =>
    console.log("Baza de date a fost deconectata")
  );
  mongoose.connection.on("error", (e) =>
    console.log(`A fost o eroare cu conectarea la baza de date: ${e}`)
  );
};
