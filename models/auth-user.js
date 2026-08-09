const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt")
// const { create } = require("domain");
// const { error } = require("console");
const jsonFilePath = path.join(process.cwd(), "data", "auth-users.json");

console.log("File path:", jsonFilePath);
console.log("File exists:", fs.existsSync(jsonFilePath));

// readData function data ko read kara ga (user.json) sa
const readData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(jsonFilePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data.toString()));
            }
        });
    });
};

// writeData function data ko write kara ga (user.json) ma  
const writeData = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// createuser function email or password chack kara ga agar ap phala sa data ma ho to (user already exist!) bola ga.
//  warna ap ko 1 new id da kar apna data ma save karlaga.
exports.createUser = async (email, password) => {
    try {
        const users = await readData();
        const matched = users.find(u => u.email === email);
        if (matched) {
            throw new Error("⚠️User already exists. Please use a different email or log in. 👤");
        }
        const hashedPassword = await bcrypt.hash(password, 10)


        const userId = Date.now();
        await writeData([...users, { email, password: hashedPassword, userId }]);

    }
    catch (err) {
        throw err;
    }
};

// finduser function ka kaam ha ka email ka zariya user ko dakhta ha 
exports.findUser = async (email) => {
    try {
        const users = await readData();
        const matched = users.find(u => u.email === email);

        return matched;
    }
    catch (err) {
        throw err;
    }
}