const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/members.json");


//Leer archivo
function readData(){
   const data = fs.readFileSync(dataPath, "utf-8");
   return JSON.parse(data);
}


//Guardar archivo
function writeData(data){
   fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}


//Obtener todo
exports.getAllMembers = () => {
   return readData();
};


//Crear socio
exports.createMember = (memberData) => {
   const members = readData();
   const newMember = { id: String(Date.now()), ...memberData };

   members.push(newMember);
   writeData(members);
   return newMember;
};


//Buscar socio por id
exports.getMemberById = (id) => {
   const members = readData();
   return members.find( member => member.id == id);
};


//Actualizar un socio
exports.updateMember = (id, newData) => {
   const members = readData();
   //const index = members.findIndex(member => member.id == id);
   const index = members.findIndex(member => String(member.id) === String(id));

   if(index === -1) return null;
   members[index] = {...members[index], ...newData};
   writeData(members);
   return members[index];
};


//Eliminar un socio
exports.deleteMember = (id) => {
   const members = readData();
   const filtered = members.filter(member => member.id != id);
   writeData(filtered);
   return { message: "Socio eliminado" };
};