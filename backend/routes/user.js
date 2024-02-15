const express = require("express")
const jwt = require("jsonwebtoken")
const { User } = require ("../db/db")
const { JWT_SECRET } = require ("../config")
const { authMiddleware } = require ("../middleware/auth")
const { signUpSchema, signInSchema, updateInfoSchema } = require ("../zodSchema/zod")


const userRouter = express.Router();


userRouter.post("/signup", async (req, res) => {
  try {
    const payload = req.body;
    const parsedPayload = signUpSchema.safeParse(payload);

    if (!parsedPayload.success) {
      res.status(411).json({
        msg: "You have entered wrong inputs.",
      });
    }

    const result = await User.findOne({
      username: req.body.username,
      email: req.body.email,
    });

    if (result) {
      res.status(409).json({
        msg: "This username / email already exists.",
      });
    } else {
      const user = await User.create(payload);
      const documentId = user._id
      const token  = jwt.sign({documentId}, JWT_SECRET)
      

      res.json({
        msg: "User created successfully.",
        token : token,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({});
  }
});



userRouter.post("/signin", async (req,res)=>{

    try {
    const payload = req.body

    const parsedPayload = signInSchema.safeParse(payload);

    if (!parsedPayload.success) {
      res.status(411).json({
        msg: "You have entered wrong inputs.",
      });
    }

    
    const result = await User.findOne({
        username: req.body.username,
        password : req.body.password
    })

    if(result){
        const documentId = result._id
        const token = jwt.sign({documentId}, JWT_SECRET)

        res.json({
            msg : "You have signed in.",
            token : token
        })
    }else{
        res.json({
            msg : "Account dosent exists."
        })
    }}catch(err){
        console.log(err);
        res.status(403).json({});
    }
})



userRouter.post("/update", authMiddleware ,async(req,res)=>{
 try { 
  const payload = req.body

  const parsedPayload = updateInfoSchema.safeParse(payload)
  
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You have entered wrong inputs.",
    });
  }


  //This in ideal situation shouldnt be rewritten as this work is already done in the middleware.
  //But i am writting again because i dont know typescript and i am getting lots of errors. so just putting whatever works
  const authHeader = req.headers.authorization


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(403).json({});
  }

  const token = authHeader?.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET)

/////////



}catch(err){
  console.log(err)
  res.status(403).json({});

}

})



module.exports = {
    userRouter,
    
}