import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: String,
    alt_names: [String],
    network: String,
    owners: [String],
    country: String,
    categories: [String],
    is_nsfw: Boolean,
    launched: Date,
    closed: Date,
    replaced_by: String,
    website: String,
  },
  { timestamps: true },
);

channelSchema.index({ country: 1 });
channelSchema.index({ categories: 1 });

export const Channel = mongoose.model("Channel", channelSchema);
