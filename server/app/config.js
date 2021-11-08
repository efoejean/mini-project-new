// Provides config for the app in conjunction with dotenv
// Config is the only place accesses 'dotenv'
import dotenv from "dotenv";

dotenv.config();

export default {
  db: {
    AirbnbURL: process.env.DB_AIRBNB_URL,
    collection: "sample_airbnb",
    name: "listingsAndReviews",
  },

  port: process.env.PORT || 3000,
};