const express = require('express');
const memberController = require('../controllers/memberController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// GET todos los socios 
router.get('/', memberController.getAllMembers);

// GET un socio por su id 
router.get('/:id', memberController.getMemberById);

// POST nuevo socio
router.post('/', memberController.createMember);

// PUT socio 
router.put('/:id', memberController.updateMember);

// DELETE socio 
router.delete('/:id', memberController.deleteMember);

module.exports = router;
