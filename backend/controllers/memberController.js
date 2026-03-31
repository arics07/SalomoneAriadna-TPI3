const memberModel = require("../models/memberModel");

//Obtener todos los socios
exports.getAllMembers = (req, res) => {
   const members = memberModel.getAllMembers();
   res.json(members);
};


//Crear un nuevo socio
exports.createMember = (req, res) => {
   const newMember = memberModel.createMember(req.body);
   res.status(201).json(newMember);
};


//Obtener socio por ID
exports.getMemberById = (req, res) => {
   const id = req.params.id;
   const member = memberModel.getMemberById(id);
   if(!member){
      return res.status(404).json({ error: "Socio no encontrado" });
   }
   res.json(member);
};


//Actualizar socio
exports.updateMember = (req, res) => {
   const id = req.params.id;
   const updated = memberModel.updateMember(id, req.body);
   res.json(updated);
};


// Eliminar socio
exports.deleteMember = (req, res) => {
   const id = req.params.id;
   const result = memberModel.deleteMember(id);
   res.json(result);
};
