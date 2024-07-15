import mongoose, { Types } from "mongoose";
import { Schema,model } from "mongoose";

const UserTokenSchema = new Schema({
    payload: Types.ObjectId,
    token: String

})
const UserToken = model("UserToken",UserTokenSchema)
export default UserToken