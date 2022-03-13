require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3002;

const driversRouter = require("./routes/drivers");
const constructorsRouter = require("./routes/constructors");
const circuitsRouter = require("./routes/circuits");
const racesRouter = require("./routes/races");
const resultsRouter = require("./routes/results");
const wikiImagesRouter = require("./routes/wikiimages");

app.use(express.json());
app.use(cors());
app.set('view engine', 'hbs');
app.use(
        express.urlencoded({
                extended: true,
        })
);

app.get("/", (req, res) => {
        res.json({ message: "app ok" });
});
app.use("/drivers", driversRouter);
app.use("/constructors", constructorsRouter);
app.use("/circuits", circuitsRouter);
app.use("/races", racesRouter);
app.use("/results", resultsRouter);
app.use("/imagelink", wikiImagesRouter);

app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        console.error(err.message, err.stack);
        res.status(statusCode).json({ message: err.message });
        return;
});

app.listen(port, () => {
        console.log(`API server listening at http://localhost:${port}`);
});