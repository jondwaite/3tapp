const express = require("express");
const cors = require("cors");
const app = express();
const port = 3004;

app.use(express.json());
app.use(cors());
app.use(
        express.urlencoded({
                extended: true,
        })
);

app.get("/", (req, res) => {
        res.json({ message: "db-status OK" });
});

app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
});