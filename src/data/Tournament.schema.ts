import { Schema, model, connect } from 'mongoose';
import { ITournament } from './Tournament.typing';

const schema = new Schema<ITournament>({
  name: { type: String, required: true },
  tournamentName: { type: String, required: true },
  accentColor: { type: String, required: true },
  brandColor: { type: String, required: true },
  logoLink: { type: String, required: true },
  playersNumber: { type: Number, default: 0 },
  streamLink: { type: String, default: '#' },
});

export const Tournament = model<ITournament>('Tournament', schema);
