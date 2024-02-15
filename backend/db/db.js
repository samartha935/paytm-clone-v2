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

const User = mongoose.model("User", userSchema);


module.exports = {
    User
}