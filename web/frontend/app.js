const express = require("express");
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

app.engine('hbs', exphbs.engine({
        defaultLayout: 'main',
        extname: '.hbs'
}));

app.set('view engine', 'hbs');

//hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.json());
app.use(
        express.urlencoded({
                extended: true,
        })
);

app.get("/", (req, res) => {
        res.json({ message: "Frontend web server ok" });
});

app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
});