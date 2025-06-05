import express from "express"
import jwt from "jsonwebtoken"
const route = express.Router()
const asign = (username, password) => {
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    return res.json({ token });
  }
};
const verify = (token) => {
 
};
route.post('/login', (req, res) => {
    const { username, password } = req.body;
    asign(username, password)

    return res.status(401).json({message: 'invalid data'})

})



export default route