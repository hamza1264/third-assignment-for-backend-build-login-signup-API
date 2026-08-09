const express = require("express");
const auth = require("./routes/auth.js");
const bodyparser = require("body-parser");
const path = require("path");

const app = express();

app.use((req, res, next) => {
    {
        req.data = "hamza"
        console.log(req.url)
        next()
    }
})

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())
app.use(express.static(path.join(process.cwd(), 'public')))
app.use('/auth', auth)

app.listen(4000, () => {
    console.log(`server is running on port ${4000}`);
});
