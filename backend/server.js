const express = require("express");
const port = process.env.PORT || 5000;
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./startup/db");
require("dotenv").config();
const cors = require("cors");

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/keys", require("./routes/accessKeyRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
