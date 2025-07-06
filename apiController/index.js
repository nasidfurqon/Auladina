const express = require("express");
const app = express();
const viewRouter = require("./routes/viewRouter");
const listRouter = require("./routes/listRouter");

app.use("/view", viewRouter);
app.use("/list", listRouter);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
    