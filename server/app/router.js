import Router from "express";
import config from "./config.js";
import client from "./loader.js";

const router = new Router();

// TODO: Add routes here (maybe 🤔 start with a GET test route)

router.get("/", (_, res) => {
    res.send("Hello from api router!");
  });

  router.get("/current-listings", async (_, res) => {
    const currentListings = await client.db(config.db.collection).collection(config.db.name).find().limit(1).toArray();
    res.json(currentListings);
  });

  

export default router;
