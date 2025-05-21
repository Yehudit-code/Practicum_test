const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/', userController.createUser);
router.get('/:id/start-end', userController.getEndAndStart);

router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)
module.exports = router;



// const express = require("express")
// const router = express.Router()
// const verifyJWT = require("../middleware/verifyJWT")
// const verifyJWTManager =require("../middleware/verifyJWTManager")

// const userController = require("../controllers/userController")

// router.get("/",verifyJWT, userController.getAllUsers)
// router.get("/:id", userController.getUserById)
// router.post("/", userController.createUser)
// router.put("/:id", userController.updateUser)
// router.delete("/:id", userController.deleteUser)


// module.exports = router