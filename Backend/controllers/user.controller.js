import User from "../models/user.model.js"
import Otp from "../models/otp.model.js"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import Note from "../models/notes.model.js"


dotenv.config();


// for register/signup
export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "User Already Exissts" });
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({ email, name,  password: hashPassword });
        await user.save();
        const token = jsonwebtoken.sign({ _id: user._id, username: user.name, email: user.email, role: user.role }, `${process.env.SECRET_KEY}`, { expiresIn: "2hr" })
        return res.status(200).json(token)
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

// for login


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: "user not exists please signup first" })
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "wrong password" })
        }
        const token = jsonwebtoken.sign({ _id: user._id,  username: user.name,email:user.email,role:user.role }, `${process.env.SECRET_KEY}`, { expiresIn: "2hr" })
        // return res.status(200).json({token, user})
        return res.status(200).json(token)
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}


// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User does not exist. Please sign up first." });
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);

//         if (!passwordMatch) {
//             return res.status(401).json({ message: "Wrong password." });
//         }

//         const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1hr" });

//         return res.status(200).json({ token }); // Return token in an object
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }

// };




//storing notes and image
export const saveNote = async (req, res) => {
    try {
        const { title, content, ownerId } = req.body; // Extract necessary data from the request body
        const imageUrl = req.file ? req.file.filename : null;
        // Create a new note
        const newNote = new Note({
            title,
            content,
            ownerId,
            imageUrl 
        });    
        await newNote.save(); // Save the new note
        res.status(200).json(newNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
};    


// for geting  singile user notes


export const getSingleUserNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const userNotes = await Note.find({ ownerId: id, deleted: false })
        // console.log(id)
        // console.log(userNotes);
        if (!userNotes) {
            return res.status(404).json({ message: "User not found" })
        }    
        return res.status(200).json(userNotes)
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }    
}    

//get deleted notes for user

export const getDeletedUserNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const userNotes = await Note.find({ ownerId: id, deleted: true })
        if (!userNotes) {
            return res.status(404).json({ message: "User not found" })
        }
        return res.status(200).json(userNotes)
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}    


//update Note 

export const editNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// move to deleted notes 

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const foundNoteIndex = await Note.findByIdAndUpdate(id, { deleted: true }, { new: true });
        res.status(200).json({ foundNoteIndex });

    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
};


// restore notes

export const restoreNote = async (req, res) => {
    const { id } = req.params;
    try {
        const foundNoteIndex = await Note.findByIdAndUpdate(id, { deleted: false }, { new: true });
        res.status(200).json({ foundNoteIndex });

    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
};



//all notes moved to deleted

export const getAllDeleteNote = async (req, res) => {
    try {
        const deletedNotes = await Note.find({ deleted: true })
        res.status(200).json(deletedNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//delete Note

export const perminentlyDeleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        // Delete the associated image if it exists
        if (note.imageUrl) {
            // Remove the image file from the uploads directory
            fs.unlink(`uploads/${note.imageUrl}`, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                }
                console.log('Image deleted successfully');
            });
        }

        await Note.findByIdAndDelete(id);
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get all notes

export const getAllNotes = async (req,res) => {
    try {
        const notes = await Note.find({deleted:false})
        if(!notes){
            return res.status(404).json({message:"no notes found"})
        }
        return res.status(200).json(notes)
    }catch (error) {
        return res.status(500).json({ message: error.message })

    }
}







export const getSingleUser = async (req, res) => {

    try {
        // console.log("users api hit");
        const { id } = req.params;
        const user = await User.findOne({ _id: id})
        if (!user) {
            return res.status(404).json({ message: "Please signup first" })
        }
        // return 
        return res.status(200).json({ message: "user accessed", user });
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}





// for getAllUsers




export const getAllUsers = async (req, res) => {

    try {
        console.log("users api hit");
        // const { email, password } = req.body;
        const users = await User.find()
        if (!users) {
            return res.status(404).json({ message: "no one exists please signup any user first" })
        }
        // return 
        return res.status(200).json({ message: "user achieved", users });
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}



export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email })
        if(!user){
            return res.status(404).json({message:"user not found"})
        }else if (user) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'fakhrahnajeeb61@gmail.com',
                    pass: 'txbq fajz ubvh qcjx'
                }
            })
            const otp = crypto.randomBytes(3).toString('hex')
            const mailOpttion = {
                from: 'fakhrahnajeeb61@gmail.com',
                to: email,
                subject: 'Reset Password',
                text: `Your OTP is ${otp}`
            }
            transporter.sendMail(mailOpttion)
            if (!transporter) {
                return res.status(500).json({ message: "password not match for your system email" })
            }
            const otpSave = new Otp({ email, otp })
            await otpSave.save();
            return res.status(200).json({ message: "OTP sent successfully" })
        }else {
            return res.status(404).json({ message: "server error 1" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export const verifyOtp = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body
        const otpVerify = await Otp.findOne({ email, otp })
        if (!otpVerify) {
            return res.status(404).json({ message: "otp not found" })
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);

        await User.updateOne({ email }, { $set: { password: hashPassword } })
        await Otp.deleteOne({ email, otp })
        return res.status(200).json({ message: "Password changed Successfully" })
    } catch (error) {
        return res.status(501).json({ message: error.message })
    }
} 