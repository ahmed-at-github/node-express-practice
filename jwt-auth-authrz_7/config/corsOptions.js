const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];

const corsOptions = {
  origin: (origin, callback) => {
    const allowed = whitelist.includes(origin) || !origin;
    callback(allowed ? null : new Error("Not allowed by CORS"), allowed);
  },
  optionsSuccessStatus: 200,
};
module.exports = corsOptions;
