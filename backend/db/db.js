const mongoose = require("mongoose")

mongoose.connect(
  "mongodb+srv://samarthudupa5:PgV5cFFTGt4M3ssH@cluster0.qiavfvk.mongodb.net/paytm-clone"
);

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
    maxLength: 50,
  },
});


const accountsSchema = new mongoose.Schema({
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref : "User"
  },
  balance : {
    type : Number,
    required : true
  }

})


const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountsSchema);


module.exports = {
    User,
    Account
}