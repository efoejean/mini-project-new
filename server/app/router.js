import Router from "express";

const router = new Router();

// TODO: Add routes here (maybe 🤔 start with a GET test route)

router.get("/", (_, res) => {
    res.send("Hello from api router!");
  });

export default router;
