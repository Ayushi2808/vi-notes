import mongoose, { Schema, Document } from "mongoose";

export interface IKeystroke {
  key: string;
  timestamp: number;
}

export interface ISession extends Document {
  userId: string;
  text: string;
  keystrokes: IKeystroke[];
  pasted: boolean;
  startTime: Date;
  endTime: Date;
}

const KeystrokeSchema: Schema = new Schema({
  key: { type: String, required: true },
  timestamp: { type: Number, required: true },
});

const SessionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  keystrokes: [KeystrokeSchema],
  pasted: { type: Boolean, default: false },
  startTime: { type: Date },
  endTime: { type: Date },
});

export default mongoose.model<ISession>("Session", SessionSchema);