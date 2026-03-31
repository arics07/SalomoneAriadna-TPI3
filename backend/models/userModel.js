const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const dataPath = path.join(__dirname, "../data/users.json");

//Leer todos los usuarios
function readUsers() {
    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data);
};

//Guardar usuarios
function writeUsers(users) {
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};

//Buscar usuario por email
exports.findUserByEmail = (email) => {
    const users = readUsers();
    return users.find(user => user.email === email);
};

//Crear un nuevo usuario (con contraseña hasheada)
exports.createUser = async ({ email, password }) => {
    const users = readUsers();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), email, password: hashedPassword };
    users.push(newUser);
    writeUsers(users);
    return newUser;
};