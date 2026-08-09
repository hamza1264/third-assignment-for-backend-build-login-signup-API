const { createUser, findUser } = require("../models/auth-user.js");
const bcrypt = require("bcrypt");

// createUser function ka kaam naya user create karna hai. Ye email aur password lekar createUser() function ko call karta hai.
exports.createUser = async (email, password) => {
    try {
        await createUser(email, password);
    }
    catch (err) {
        throw err;
    }
};

// login function ka kaam ha user ko login karna. Ye email aur password check karta hai aur uske hisaab se result return karta hai.
exports.login = async (email, password) => {
    try {
        const user = await findUser(email);

        if (!user) {
            return "❌Invalid email or password. Please try again. 🔒"

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return "🎉Login successful! Welcome back. 😊"

        }

        return "❌Invalid email or password. Please try again. 🔒"

    }
    catch (err) {
        throw err;
    };
};