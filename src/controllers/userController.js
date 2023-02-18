const res = require("express/lib/response")
const { default: mongoose } = require("mongoose")
const userModel = require("../models/userModel")

////////////////////////////////////////////////VALIDATION//////////////////////////////////////////

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

let isValid = (value) => {
    if (typeof value === "undefined" || typeof value === "null") {
        return false
    }
    if (typeof value === "string" && value.trim().length > 0) {
        return true
    }
}
let isValidRequestBody = (v) => {
    if (Object.keys(v).length > 0) {
        return true
    }
}
const isValidTitle = (title) => {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1;
};
//////////////////CREATING A USER//////////////////////////////////////////////////////////////
const createAuthor = async (req, res) => {

    try {
        let data = req.body

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "give data in body" })
        }

        let { fname, lname, title, email, password } = data

        if (!isValid(fname)) {
            return res.status(400).send({ status: false, message: "give f name" })
        }

        if (!isValid(lname)) {
            return res.status(400).send({ status: false, message: "give lname" })
        }
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "give title" })
        }
        if (!isValidTitle(title)) {
            return res.status(400).send({ status: false, message: "give valid title" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "give valid email" })
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).send({ status: false, message: "email is not valid" })
        }
        const emailalreadyused = await userModel.findOne({ email: email })
        if (emailalreadyused) {
            return res.status(400).send({ status: false, message: "exist email" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "give password" })
        }
        const create = await userModel.create(data)
        res.status(201).send({ status: true, message: "created", create })

    } catch (error) {
        return res.status(400).send({ status: false, message: error.message })
    }
}

//////////////////////GETTING ALL USER DETAILS/////////////////////////////////////////////////////////////////////
const getUser = async function (req, res) {
    try {
        let getUser = await userModel.find()
        if (!getUser) {
            return res.status(404).send({ status: false, msg: "no user present" })
        }
        res.status(200).send({ status: true, msg: "sucess", data: getUser })
    }
    catch (err) { res.status(500).send({ status: false, error: err.message }) }
}
//////////////////////////GETTING SINGLE USER BY ID//////////////////////////////////////////////////////
const getByIdUser = async function (req, res) {
    try {
        let userId = req.params.userId
        if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, msg: "invalid userId format" }) }

        let getUser = await userModel.findById(userId)
        if (!getUser) {
            return res.status(404).send({ status: false, msg: "no user found" })
        }
        res.status(200).send({ status: true, msg: "sucess", data: getUser })
    }
    catch (err) { res.status(500).send({ status: false, error: err.message }) }
}
//////////////////////////UPDATING A USER DETAILS////////////////////////////////
const updateUser = async function (req, res) {

    try {
        let data = req.body;
        let userId = req.params.userId;
        let userPresent = await userModel.findOne({ _id: userId })
        if (!userPresent) {
            res.send({ err: "user not found" })
        }
        const updatedUser = await userModel.findByIdAndUpdate(userId, data, { new: true })
        res.status(201).send({ status: true, msg: "successfully updated", updatedUser })
    } catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

//////////DELETE A USER BY EMAIL ID/////////////////////////////////////////////////////////////////
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId
        if (!userId) {
            return res.status(400).send({ status: false, message: "give the user id" })
        }
        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "invalid Id" })
        }
        checkUserId = await userModel.findById(userId)
        if (!checkUserId) {
            return res.status(404).send({ status: false, msg: "no data with this id found" })
        }
        const data = req.body
        const { email, password } = data

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "give valid email" })
        }
        const checkEmail = await userModel.findOne({ email: email })
        if (!checkEmail) {
            return res.status(400).send({ status: false, message: "no user found" })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "give password" })
        }
        const checkPassword = await userModel.findOne({ password: password })
        if (!checkPassword) {
            return res.status(400).send({ status: false, message: "wrong password" })
        }
        deletebyId = await userModel.deleteOne({ isDeleted: true}, { new: true })
        res.status(200).send({ status: true, msg: "success", data: deletebyId })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {
    createAuthor,
    getUser,
    getByIdUser,
    updateUser,
    deleteUser
}
