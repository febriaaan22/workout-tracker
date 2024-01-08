const corsOptions = {
  origin: [
    "http://localhost:5173", // local front end
    "https://workout-tracker-server-navy.vercel.app", // backend server
    "https://workout-tracker-weld.vercel.app", // frontend
    "https://www.versto.site" // frontend with domain
  ],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
};

module.exports = { corsOptions };
