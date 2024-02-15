const express = require("express");
const mongoose = require("mongoose")
const { authMiddleware } = require("../middleware/auth");
const { Account } = require("../db/db");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  try {

    const result = await Account.findOne({ userId: req.documentId });

    if (!result) {
      res.json({
        msg: "Couldn't find the user's balance.",
      });
    }

    res.json({
      balance: result.balance,
    });
  } catch (err) {
    console.log(err);
    res.json({});
  }
});




accountRouter.post("/transfer" , authMiddleware, async(req,res)=>{
    try{
        const session = await mongoose.startSession()

        session.startTransaction()
        const info = req.body

        const account = await Account.findOne({userId : req.documentId}).session(session)

        if(!account){
            res.status(400).json({
                msg : "Error while finding your account details."
            })
        }

        if(account.balance < info.amount){
            await session.abortTransaction()
            res.status(400).json({
                message: "Insufficient balance"
            })
        }



        const toAccount = await Account.findOne({userId : info.to}).session(session)

        if(!toAccount){
            await session.abortTransaction()
            res.status(400).json({
                msg : "Invalid To account Information."
            })
        }


        await Account.updateOne({ userId : req.documentId }, { $inc : { balance : -info.amount }}).session(session)
        await Account.updateOne({ userId : info.to }, { $inc : { balance : info.amount }}).session(session)

        await session.commitTransaction()

        res.json({
            msg : "Transaction Successful"
        })



    }catch(err){
        console.log(err)
        res.json({})
    }
})





module.exports = {
  accountRouter,
};
