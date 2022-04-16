import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface jobDocument extends mongoose.Document {
  title: string;
  sector: string;
  country: string;
  city: string;
  description: string;
}

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const jobModel = mongoose.model<jobDocument>("job", jobSchema);
export default jobModel;
