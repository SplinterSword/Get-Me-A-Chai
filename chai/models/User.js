
import mongoose from "mongoose";
const {Schema,model} = mongoose;

const UserSchema = new Schema({
    useremail: {type: String},
    username: {type: String},
    name: {type: String},
    profilepic: {type: String},
    coverpic: {type: String},
    razorpayid: {type: String},
    razorpaysecret: {type: String},
});

export default mongoose.models.User || model("User", UserSchema);