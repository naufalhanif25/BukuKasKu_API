if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const transactionRoute = require("./routes/transactionRoute");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
};

// Database connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI.toString(), clientOptions);

        console.log("Successfully connect to the MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(console.dir);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/transaction", transactionRoute);
app.get("/api/test-env", (req, res) => {
    res.json({
        mongoUri: process.env.MONGO_URI ? "defined" : "undefined",
        nodeEnv: process.env.NODE_ENV,
    });
});

module.exports = app;
