const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.put('/:id', userController.updateUser);

router.post('/', async (req, res) => {
  try {
    const user = await new (require('../models/User'))(req.body).save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user' });
  }
});


module.exports = router;
