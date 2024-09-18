const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const User=require('../models/User')

const {body,validationResult}=require('express-validator')
const bcrypt=require('bcryptjs')
const Orders = require('../models/Orders')
const secretKey="66e5b4bf0e4845af83eeb21d"




router.post("/CreateUser/",
    [
    body('email',"Enter a valid Email").isEmail(),
    body('name').isLength({min:5}),
    body('password',"Minmum length of password is 5 characters").isLength({min:5}),
    
    ]
    ,async (req,res)=>{
        const salt=await bcrypt.genSalt(10)
        const bcryptPassword=await bcrypt.hash(req.body.password,salt)
        const errors=validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({error:errors.array()})
        }
    try {
        
      await  User.create({
            name:req.body.name,
            password:bcryptPassword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true})

    }catch (e) {
        console.log(e)
        res.json({success:false})
    }
})

router.post("/loginUser/",
    [
    body('email',"Enter a valid Email").isEmail(),
    body('password',"Minmum length of password is 5 characters").isLength({min:5}),
    ]
    ,
   async (req,res)=>{
    const errors=validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({error:errors.array()})
        }
        const email=req.body.email;
        global.userEmail=email
    try {
      let userData=await  User.findOne({email})
      
      if(!userData) {
        return res.status(400).json({error:"Your Email is Incorrect"})
      }
      const isPasswordCorrect=await bcrypt.compare(req.body.password,userData.password)
      global.userName=userData.name
      if(!isPasswordCorrect) {
        return res.status(400).json({error:"Your Password is Incorrect"})
      }
      
      
      const payload={
        user:{
            id:userData.id
        }
      }
      const authToken=jwt.sign(payload,secretKey)
      
      return res.json({success:true,jwtToken:authToken})
       
    }catch (e) {
        console.log(e)
        res.json({success:false})
    }
})


router.get('/userProfile/',async (req,res)=>{
    
    try {
        const userEmail=global.userEmail
        const userName=global.userName
        
        if(userEmail!==undefined && userName!==undefined ) {
            res.json({success:true,userEmail:userEmail,userName:userName})
        }

    }catch (e) {
        console.log(e)
        res.json({success:false})
    }
})
module.exports=router