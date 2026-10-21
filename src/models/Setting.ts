import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStat {
  value: string;
  label: string;
}

export interface IWordmark {
  first: string;
  rest: string;
}

export interface ISetting extends Document {
  wordmark: IWordmark;
  heroEyebrow: string;
  heroTitle: string;
  heroParagraph: string;
  stats: IStat[];
  githubUrl: string;
  linkedinUrl: string;
  whatsappUrl: string;
  email: string;
  cvPath: string;
  contactHeading: string;
  contactText: string;
  createdAt: Date;
  updatedAt: Date;
}

const StatSchema = new Schema<IStat>(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false }
);

const WordmarkSchema = new Schema<IWordmark>(
  {
    first: { type: String, required: true },
    rest: { type: String, required: true },
  },
  { _id: false }
);

const SettingSchema = new Schema<ISetting>(
  {
    wordmark: { type: WordmarkSchema, required: true },
    heroEyebrow: { type: String, required: true },
    heroTitle: { type: String, required: true },
    heroParagraph: { type: String, required: true },
    stats: { type: [StatSchema], default: [] },
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    whatsappUrl: { type: String, default: "" },
    email: { type: String, default: "" },
    cvPath: { type: String, default: "" },
    contactHeading: { type: String, default: "" },
    contactText: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Setting: Model<ISetting> =
  mongoose.models.Setting || mongoose.model<ISetting>("Setting", SettingSchema);

export default Setting;
