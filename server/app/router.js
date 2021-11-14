import Router from "express";
import config from "./config.js";
import client from "./loader.js";


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
 const listingsById = await collection.findOne({_id: (req.params.id)});
    
      res.json(listingsById);
  });

  // get review by Id.
  router.get("/reviews/:id", async (req,res ) =>{
    const listingsById =  await collection.findOne({_id: (req.params.id)});
     res.json(listingsById.reviews)
  })

// Post a review by ID
// use $push to add the review to the array
// insertOne was giving duplicate Id error, i use update one which make sense since we update the array with a new review
// UpdateOne using payload give a null in the array we didnt provide a payload. updateOne with req.body works
  router.post("/reviews/:id", async (req,res ) =>{
    const postReviewById =  await collection.updateOne({_id: (req.params.id)}, {$push: {reviews: req.body}});
     res.json(postReviewById)
  })

  // Send a new listing
  router.post("/listings", async (req,res) =>{
    const createNewListing = await collection.insertOne(req.body)
    res.json(createNewListing);
  })

// Update a listing
router.put("/listings", async (req,res) => {
  const updateListing = await collection.updateOne({_id: req.body.id}, 
  {$set: req.body.payload})
  res.json(updateListing);
})


// Delete a listing

router.delete("/listings", async (req,res) =>{
  const deleteListing = await collection.deleteOne({_id: (req.body.id)});
  res.json(deleteListing);
})


export default router;
