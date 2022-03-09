const express = require("express");

const app = express()

app.get("/", (req,res) => {
    res.send("<h2>This is vettyo API. Please refere this docs!!</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listning on port ${port}`));