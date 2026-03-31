const express = require('express');
const fs = require('fs');
const path = require('path');
const memberController = require("../controllers/memberController");

// Creo un enrutador
const router = express.Router();

// Ruta al archivo JSON que funciona como BBDD
const dataPath = path.join(__dirname, '../data/members.json');

// RUTAS

// Obtener todos los socios: GET
router.get('/', memberController.getAllMembers);
/*router.get('/items', (req, res) => {
    const members = JSON.parse(fs.readFileSync(dataPath, 'utf-8')); //lee los datos de los socios existentes
    res.json(members);
});
*/

// Obtener un socio por id: GET
router.get('/:id', memberController.getMemberById);
/*router.get('/items', (req, res) => {
    const members = JSON.parse(fs.readFileSync(dataPath, 'utf-8')); //lee los datos de los socios existentes
    res.json(members);
});
*/

// Agregar un nuevo socio: POST
router.post('/', memberController.createMember);
/*router.post('/items', (req, res) => {
    const newMember = req.body; //obtenemos el nuevo socio desde la solicitud
    const members = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    members.push(newMember);
    fs.writeFileSync(dataPath, JSON.stringify(members, null, 2));
    res.json({ message: 'Nuevo socio agregado: ', member: newMember });
});
*/

// Actualizar un socio existente: PUT
router.put('/:id', memberController.updateMember);
/*router.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const updateMember = req.body;
    let members = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    members = members.map(member => ( member.id == id ? updateMember : member ));
    fs.writeFileSync(dataPath, JSON.stringify(members, null, 2));
    res.json({ message: 'Socio actualizado.', member: updateMember });
});
*/

// Eliminar un socio: DELETE
router.delete('/:id', memberController.deleteMember);
/*router.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    let members = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    members = members.filter(member => member.id != id);
    fs.writeFileSync(dataPath, JSON.stringify(members, null, 2));
    res.json({ message: 'Socio eliminado.' });
});
*/

module.exports = router;