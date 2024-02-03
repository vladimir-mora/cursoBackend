const mongoose = require("mongoose");
const url = "mongodb+srv://vladimirgonza321:pirulin1@cluster0.arjsd3i.mongodb.net/ecommerce?retryWrites=true&w=majority";
mongoose
    .connect(url)
    .then(() => {
        console.log("Conexion exitosa");
    })
    .catch((err) => {
        console.log(err);
    })