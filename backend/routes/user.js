const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User, Account } = require("../db/db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/auth");
const {
  signUpSchema,
  signInSchema,
  updateInfoSchema,
} = require("../zodSchema/zod");

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
    }
    const user = await User.create(payload);
    const documentId = user._id;

    await Account.create({
      userId : documentId,
      balance :  100 + Math.random() * 10000
    })



    const token = jwt.sign({ documentId }, JWT_SECRET);

    res.json({
      msg: "User created successfully.",
      token: token,
    });

  } catch (err) {
    console.log(err);
    res.status(403).json({});
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const payload = req.body;

    const parsedPayload = signInSchema.safeParse(payload);

    if (!parsedPayload.success) {
      res.status(411).json({
        msg: "You have entered wrong inputs.",
      });
    }

    const result = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (result) {
      const documentId = result._id;
      const token = jwt.sign({ documentId }, JWT_SECRET);

      res.json({
        msg: "You have signed in.",
        token: token,
      });
    } else {
      res.json({
        msg: "Account dosent exists.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({});
  }
});

userRouter.post("/update", authMiddleware, async (req, res) => {
  try {
    const payload = req.body;

    const documentId = new mongoose.Types.ObjectId(req.documentId);

    const parsedPayload = updateInfoSchema.safeParse(payload);

    if (!parsedPayload.success) {
      res.status(411).json({
        msg: "You have entered wrong inputs.",
      });
    }

    const update = await User.updateOne(
      {
        _id: documentId,
      },
      payload
    );

    if (update) {
      res.json({
        msg: "Information updated sucessfully.",
      });
    } else {
      req.json({
        msg: "Error occured while updating.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({});
  }
});

// userRouter.get("/bulk", authMiddleware, async (req, res) => {
//   try {
//     const filter = req.query.filter || "";

//     const name = await User.find({
//       $or: [
//         {
//           firstName: {
//             $regex: filter,
//             $options: "i",
//           },
//           lastName: {
//             $regex: filter,
//             $options: "i",
//           },
//           username: {
//             $regex: filter,
//             $options: "i",
//           },
//         },
//       ],
//     });

//     if (name) {
//       res.json({
//         user: name.map((user) => ({
//           username: user.username,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           _id: user._id,
//         })),
//       });
//     } else {
//       res.json({
//         msg: "No user found.",
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.json({});
//   }
// });

module.exports = {
  userRouter,
};
