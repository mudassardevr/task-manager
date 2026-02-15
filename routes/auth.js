const express = require("express");
const User = require("../models/User");
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser")



const {body, validationResult} = require("express-validator");

const router = express.Router();


const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET" , JWT_SECRET);


//Router 1: Register/ create user  with Post :no login required
router.post("/register", [
    body("name", " name should be atlest 3").isLength({ min:3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password","Enter a valid password").isLength({min:5})
], async (req, res) => {

    //check validatons errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

  try {
    const { name, email, password } = req.body;

    // check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    //hash password
    const salt = await brcypt.genSalt(10);
    const hashpassword = await brcypt.hash(password, salt);

    // create user
    user = await User.create({
      name,
      email,
      password: hashpassword,
    });

    // create token
    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server erros");
  }
});


// ROUTE 2:  Authentication  Login API using post : No login requried

router.post("/login", [
    body("email","Enter a valid email").isEmail(),
    body("password","password cant be blank").exists()
] ,async (req, res) => {

    //check if user can login
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }

  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentails " });
    }

    const passwordCompare = await brcypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Invalid credentails" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).send("server erros");
  }
});


/// router 3 : getuser using GET : login reqiured
router.get("/getuser",fetchUser, async(req,res)=>{
  res.json(req.user);
})

module.exports = router
