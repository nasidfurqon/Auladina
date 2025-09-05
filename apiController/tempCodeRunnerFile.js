const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const viewRouter = require("./routes/viewRouter");
const listRouter = require("./routes/listRouter");
const updateRouter = require("./routes/updateRouter");
const addRouter = require("./routes/addRouter");
const deleteRouter = require("./routes/deleteRouter");
const authRouter = require("./routes/authRouter");
const filterRouter = require("./routes/filterRouter");

app.use("/view", viewRouter);
app.use("/list", listRouter);
app.use("/update", updateRouter);
app.use("/add", addRouter);
app.use("/delete", deleteRouter);
app.use("/auth", authRouter);
app.use("/filter", filterRouter);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
    