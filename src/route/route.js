const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")


////////////CREATING A USER/////////////////////////////////////////////////////////////////////////////////////
router.post("/Create",userController.createAuthor)

//////////////////////GETTING ALL USER DETAILS/////////////////////////////////////////////////////////////////////
router.get("/GetUser",userController.getUser)

//////////////////////////GETTING SINGLE USER BY ID//////////////////////////////////////////////////////
router.get("/userById/:userId",userController.getByIdUser)

//////////////UPDATE USER///////////////////////////////////////////////////////////////////////////////
router.put("/update/:userId",userController.updateUser)

////////////////////////DELETE USER/////////////////////////////////////////////////////////////////////
router.delete('/delete/:userId',userController.deleteUser)



module.exports=router