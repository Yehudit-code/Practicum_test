const express = require('express');
const router = express.Router();
const playController = require('../controllers/playController')

router.post('/', playController.startGame);
// router.get('/:id/start-end', userController.getEndAndStart);
router.post('/:id/move', playController.play)

// router.get("/", userController.getAllUsers)
// router.get("/:id", userController.getUserById)
// router.put("/:id", userController.updateUser)
// router.delete("/:id", userController.deleteUser)
module.exports = router;
