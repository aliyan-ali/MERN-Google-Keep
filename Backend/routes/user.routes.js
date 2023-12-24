import express from "express";
import { register, login, getAllUsers, forgetPassword, verifyOtp, saveNote, deleteNote, editNote, getSingleUserNotes } from "../controllers/user.controller.js";
// import { createSetting, getAllSettings } from "../controllers/settings.controller.js";
import { middlewareFunc } from "../Middleware/middleware.js"
const router = express.Router();


router.post("/user", register)
// router.post("/user/login", login)
router.post("/user/login", login)
// router.get("/user/getallusers", getAllUsers)
router.get("/user/getallusers", middlewareFunc, getAllUsers)
router.post("/user/forgot-password", forgetPassword);
router.post("/user/reset-password", verifyOtp);
//check these routes
router.post("/user/add-note", saveNote)
router.get("/user/get-note/:id",  getSingleUserNotes);
router.patch("/user/edit-note/:id", editNote)
router.delete("/user/delete-note/:id", deleteNote)
// router.post("/setting", createSetting)
// router.get("/setting", getAllSettings)


export default router;  