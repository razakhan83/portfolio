import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  stackLine: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  isConcept: boolean;
  problem: string;
  builtBullets: string[];
  result: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    stackLine: { type: String, default: "" },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    isConcept: { type: Boolean, default: false },
    problem: { type: String, default: "" },
    builtBullets: { type: [String], default: [] },
    result: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
