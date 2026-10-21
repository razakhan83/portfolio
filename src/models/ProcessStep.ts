import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProcessStep extends Document {
  number: string;
  title: string;
  text: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProcessStepSchema = new Schema<IProcessStep>(
  {
    number: { type: String, default: "" },
    title: { type: String, required: true, trim: true },
    text: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ProcessStep: Model<IProcessStep> =
  mongoose.models.ProcessStep ||
  mongoose.model<IProcessStep>("ProcessStep", ProcessStepSchema);

export default ProcessStep;
