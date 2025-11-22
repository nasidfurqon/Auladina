
const express = require("express");
const cors = require("cors");
const app = express();

// Konfigurasi CORS agar frontend bisa akses backend
app.use(cors({
  origin: "http://localhost:5173", // sesuaikan dengan port frontend
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const viewRouter = require("./routes/viewRouter");
const listRouter = require("./routes/listRouter");
const updateRouter = require("./routes/updateRouter");
const addRouter = require("./routes/addRouter");
const deleteRouter = require("./routes/deleteRouter");
const authRouter = require("./routes/authRouter");
const filterRouter = require("./routes/filterRouter");
const uploadRouter = require("./routes/uploadRouter.js")

app.use("/view", viewRouter);
app.use("/list", listRouter);
app.use("/update", updateRouter);
app.use("/add", addRouter);
app.use("/delete", deleteRouter);
app.use("/auth", authRouter);
app.use("/filter", filterRouter);
app.use("/upload", uploadRouter);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
    