const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./Develop/routes/api-route")(app);
require("./Develop/routes/html-route")(app);

app.listen(PORT, function(){
    console.log(`Ready to view on http://localhost:${PORT}`);
});