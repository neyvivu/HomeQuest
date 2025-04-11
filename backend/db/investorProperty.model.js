import mongoose from "mongoose";
const { Schema } = mongoose;


const investorPropertySchema = new mongoose.Schema({
  month: { type: String, required: true },
  town: { type: String, required: true },
  flat_type: { type: String, required: true },
  block: { type: Schema.Types.Mixed, required: true },
  street_name: { type: String, required: true },
  storey_range: { type: String, required: true },
  floor_area_sqm: { type: Number, required: true },
  flat_model: { type: String, required: true },
  lease_commence_date: { type: Number, required: true },
  remaining_lease: { type: String, required: true },
  resale_price: { type: Number, required: true },
});

export const InvestorProperty = mongoose.model("InvestorProperty", investorPropertySchema, "homequest");
export const InvestorWatchList = mongoose.model("InvestorWatchList", investorPropertySchema, "homequest");