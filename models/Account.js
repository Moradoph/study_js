import mongoose from "mongoose";
const { Schema, model } = mongoose;

const accountSchema = new Schema({
    name: String,
    username: String,
    password: String,
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }]
});

const Account = model('Account', accountSchema);
export default Account;