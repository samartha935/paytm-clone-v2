const express = require("express");
const mongoose = require("mongoose")
const { authMiddleware } = require("../middleware/auth");
const { Account } = require("../db/db");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  try {

    const result = await Account.findOne({ userId: req.documentId });

    if (!result) {
      return res.status(404).json({
        msg: "Couldn't find the user's balance.",
      });
    }

    return res.json({
      balance: result.balance,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({});
  }
});




accountRouter.put("/transfer" , authMiddleware, async(req,res)=>{
    try{
        const session = await mongoose.startSession()

        session.startTransaction()
        const info = req.body

        const account = await Account.findOne({userId : req.documentId}).session(session)

        if(!account){
            return res.status(404).json({
                msg : "Error while finding your account details."
            })
        }

        if(account.balance < info.amount){
            await session.abortTransaction()
            return res.status(400).json({
                msg: "Insufficient balance"
            })
        }



        const toAccount = await Account.findOne({userId : info.to}).session(session)

        if(!toAccount){
            await session.abortTransaction()
            return res.status(422).json({
                msg : "Invalid recipient account Information."
            })
        }


        await Account.updateOne({ userId : req.documentId }, { $inc : { balance : -info.amount }}).session(session)
        await Account.updateOne({ userId : info.to }, { $inc : { balance : info.amount }}).session(session)

        await session.commitTransaction()

        return res.json({
            msg : "Transaction Successful"
        })



    }catch(err){
        console.log(err)
        return res.status(404).json({})
    }
})





module.exports = {
  accountRouter,
};
