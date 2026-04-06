const express = require('express');
const memberController = require('../controllers/memberController');
const authenticateToken = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate')
const memberSchema = require('../validations/member');

const router = express.Router();

// GET todos los socios 
router.get('/', memberController.getAllMembers);

// GET un socio por su id 
router.get('/:id', memberController.getMemberById);

// POST nuevo socio
router.post('/', authenticateToken, validate(memberSchema), memberController.createMember);

// PUT socio 
router.put('/:id', authenticateToken, validate(memberSchema), memberController.updateMember);

// DELETE socio 
router.delete('/:id', authenticateToken, memberController.deleteMember);

module.exports = router;
