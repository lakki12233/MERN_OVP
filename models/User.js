const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
    username:{type:String, require:true, unique: true},
    email: {type:String, require:true, unique: true},
    password: {type:String, require:true},
    profilePic:{type:String, default: ""},
    isAdmin : {type: Boolean, default: false},
    phone : {type: String, require:true, unique: true},
    address : {type: String, require:true},
    },
 {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);