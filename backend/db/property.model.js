import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    flat_type: {
      type: String,
      required: true,
    },
    block: {
      type: Number,
      required: true,
    },
    street_name: {
      type: String,
      required: true,
    },
    storey_range: {
      type: String,
      required: true,
    },
    floor_area_sqm: {
      type: Number,
      required: true,
    },
    flat_model: {
      type: String,
      required: true,
    },
    lease_commence_date: {
      type: Number,
      required: true,
    },
    remaining_lease: {
      type: String,
      required: true,
    },
    resale_price: {
      type: Number,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    agentRef: {
      type: String,
      required: true,
    },
    LONGITUDE: {
      type: String,
      required: true,
    },
    LATITUDE: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Property = mongoose.model("Property", propertySchema, "homedb");
export const ManagedListing = mongoose.model("ManagedListing", propertySchema, "homedb");
export const WatchList = mongoose.model("WatchList", propertySchema, "homedb");

