import express from "express";
import { register, login, getAllUsers, forgetPassword, verifyOtp, saveNote, deleteNote, editNote, getSingleUserNotes, getAllNotes,  getSingleUser } from "../controllers/user.controller.js";
// import { createSetting, getAllSettings } from "../controllers/settings.controller.js";
import { middlewareFunc } from "../Middleware/middleware.js"
import multer from "multer"
import path from "path";



const router = express.Router();


router.post("/user", register)
// router.post("/user/login", login)
router.post("/user/login", login)
router.get("/user/getuser", middlewareFunc, getSingleUser)
router.get("/user/getallusers", getAllUsers)
router.post("/user/forgot-password", forgetPassword);
router.post("/user/reset-password", verifyOtp);


//image upload handling

const storage = multer.diskStorage({
    // Define storage destination and filename for the uploaded images
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder for images
    },
    filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded image
        cb(null, Date.now() + '-' + path.extname(file.originalname));
    }
});
const upload = multer({ storage });





router.post("/user/add-note", upload.single("image"), saveNote)
router.get("/user/get-note/:id" , middlewareFunc ,getSingleUserNotes);
router.patch("/user/edit-note/:id", middlewareFunc,  editNote)
router.delete("/user/delete-note/:id", middlewareFunc,  deleteNote)
router.get("/user/get-all-notes", middlewareFunc, getAllNotes)
// router.post("/setting", createSetting)
// router.get("/setting", getAllSettings)


export default router;  