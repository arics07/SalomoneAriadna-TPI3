const express = require('express');
const fs = require('fs');
const path = require('path');

// Creo un enrutador
const router = express.Router();

// Ruta al archivo JSON que funciona como BBDD
const dataPath = path.join(__dirname, '../data/members.json');

// RUTAS

// Obtener todos los socios: GET
router.get('/', (req, res) => {
    const members = JSON.parse(fs.readFileSync(dataPath, 'utf-8')); //lee los datos de los socios existentes
    res.json(members);
});

// Agregar un nuevo socio: POST
router.post('/', (req, res) => {
    const newMember = req.body; //obtenemos el nuevo socio desde la solicitud
    const members = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    members.push(newMember);
    fs.writeFileSync(dataPath, JSON.stringify(members, null, 2));
    res.json({ message: 'Nuevo socio agregado: ', contact: newMember });
});

// Actualizar un socio existente: PUT
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updateMember = req.body;
    let members = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    members = members.map(member => { member.id === id ? updateMember : member });
    fs.writeFileSync(dataPath, JSON.stringify(members, null, 2));
    res.json({ message: 'Socio actualizado.', member: updateMember });
});

// Eliminar un socio: DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let members = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    members = contacts.filter(member => member.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(members, null, 2));
    res.json({ message: 'Socio eliminado.' });
});

module.exports = router;