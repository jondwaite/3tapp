const express = require("express");
const app = express();
const port = 3003;
app.use(express.json());
app.use(
        express.urlencoded({
                extended: true,
        })
);

app.get("/", (req, res) => {
        res.json({ message: "app-status OK" });
});

app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
});