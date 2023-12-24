import jwt from "jsonwebtoken"


export const middlewareFunc = (req, res, next) => {
    try {
        // req.headers.authorization &&
            // req.headers.authorization.startsWith("Bearer")
        // const token = req.headers.authorization.split(" ")[1]
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTg1NDU1OGJiNmYxOTY0ZjIxNzMwZmEiLCJ1c2VybmFtZSI6ImFsaSIsImlhdCI6MTcwMzIzOTE0NSwiZXhwIjoxNzAzMjQyNzQ1fQ.BQrONozFDkUax5PKjy9WuIq9aPSlOsQiNOB-fh23YDA'
        if (!token) {
            return res.status(403).json("denied access because you are not authenticated, token not found")
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("you are not authorized" + err)
            }
            req.user = user;
            next();
        })

    } catch (error) {
        res.status(500).json(error)
    }
}
// export const middlewareFunc = (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[0];
//         if (!token) {
//             return res.status(403).json("Denied access because you are not authenticated, token not found");
//         }
//         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//             if (err) {
//                 return res.status(403).json("You are not authorized: " + err.message);
//             }
//             req.user = decoded;
//             next();
//         });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };