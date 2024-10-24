import mongoose, { Schema, Document, Types } from "mongoose";
import * as bcrypt from "bcryptjs";

// Define the User interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  _id: Types.ObjectId;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
}

// Define the User schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
