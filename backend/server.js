// const app = require("./src/app");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// // Enable CORS
// app.use(cors({
//   origin: "*"
// }));

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("DB connected");
//     app.listen(process.env.PORT, () => {
//       console.log(`Server running on port ${process.env.PORT}`);
//     });
//   })
//   .catch(err => console.log(err));

require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");

const PORT = process.env.PORT || 5000;

// Connect to Database first, THEN start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected successfully");
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Stop the server if the DB fails to connect
  });