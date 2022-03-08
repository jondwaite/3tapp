const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
app.use(express.json());
app.use(cors());
app.use(
        express.urlencoded({
                extended: true,
        })
);

app.get("/", (req, res) => {
        res.json({ message: "web-status ok" });
});

app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
});