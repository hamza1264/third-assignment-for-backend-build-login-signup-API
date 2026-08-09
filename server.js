const express = require("express");
// const form = require("./routes/form");
const auth = require("./routes/auth.js");
const bodyparser = require("body-parser");
const path = require("path");

// const { count } = require("console");
const app = express();

app.use((req, res, next) => {
    {
        req.data = "hamza"
        console.log(req.url)
        next()
    }
})
// app.get('/', (req, res) => {
//     res.send("Please go to 💖/form💖 to open the form.");
// });
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())
app.use(express.static(path.join(process.cwd(), 'public')))
// app.use('/form', form)
app.use('/auth', auth)

app.listen(4000, () => {
    console.log(`server is running on port ${4000}`);
});
