import express, { Request, Response } from "express";
var cors = require("cors");
var morgan = require("morgan");

async function startServer() {
  try {
    // Create a new express application instance
    const app = express();

    // Logging middleware
    app.use(morgan("dev"));

    // Add CORS middleware
    app.use(cors());

    // Middleware to parse JSON and URL-encoded bodies
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Define the root path with a greeting message
    app.get("/", (req: Request, res: Response) => {
      res.json({ message: "Welcome to Daemo Genie Agent Microservice!" });
    });

    // Define test endpoint with a greeting message
    app.get("/hello/:name", (req: Request, res: Response) => {
      res.json({ message: `Hello ${req.params.name ?? "World"}!` });
    });

    // Define test endpoint with a greeting message
    app.get("/goodbye/:name", (req: Request, res: Response) => {
      res.json({ message: `Goodbye ${req.params.name ?? "World"}!` });
    });

    // Define test endpoint for JSON bodies
    app.get("/greet/:name", (req: Request, res: Response) => {
      const { greeting } = req.body;
      res.json({ message: `${greeting} ${req.params.name ?? "World"}!` });
    });

    // Set the network port
    const port = process.env.PORT || 3000;

    // Start the Express server
    app.listen(port, () => {
      console.log(`The server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting service:\n", error);
    process.exit(1);
  }
}

startServer();
