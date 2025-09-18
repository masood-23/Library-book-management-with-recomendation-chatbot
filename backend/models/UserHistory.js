import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    query: { type: String, required: true },
    response: { type: String, required: true },
  },
  { timestamps: true }
);

const UserHistory = mongoose.model("UserHistory", historySchema);

export default UserHistory;
