const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/auth");

router.post("/login", async (req, res) => {
    try {
        const resp = await login(req.body.email, req.body.password)
        res.send(resp);
    }
    catch (err) {
        // res.send(error);
        res.status(500).send(err.message)
    };
});

router.post("/signup", async (req, res) => {
    try {
        console.log(req.body);
        await createUser(req.body.email, req.body.password)
        res.send("✅User created successfully! 🎉")
    }
    catch (err) {
        // res.send(error)
        res.status(500).send(err.message)
    };

});

module.exports = router;
