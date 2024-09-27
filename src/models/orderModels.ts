// src/models/Order.ts
import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./productModel";
import { IUser } from "./userModel";

// Define the OrderItem interface
interface IOrderItem extends Document {
  product: IProduct["_id"];
  quantity: number;
}

// Define the Order interface
export interface IOrder extends Document {
  user: IUser["_id"];
  orderItems: IOrderItem[];
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
}

// Define the Order schema
const orderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
});

// Create the Order model
const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
