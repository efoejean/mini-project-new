import Router from "express";
import config from "./config.js";
import client from "./loader.js";
import { ObjectId } from "mongodb";

const collection =  client.db(config.db.collection).collection(config.db.name);
const router = new Router();



// TODO: Add routes here (maybe 🤔 start with a GET test route)

router.get("/", (_, res) => {
    res.send("Hello from api router!");
  });

  // get the all the listing
  router.get("/listings", async (_, res) => {
    const currentListings = await collection.find().limit(1).toArray();
    res.json(currentListings);
  });

// get listing by id
  router.get("/listings/:id", async (req, res) => {
 const currentListings = await collection.findOne({_id: (req.params.id)});
    
      res.json(currentListings);
  });

  // get review by Id.
  router.get("/reviews/:id", async (req,res ) =>{
    const currentListings =  await collection.findOne({_id: (req.params.id)});
     res.json(currentListings.reviews)
  })

export default router;
