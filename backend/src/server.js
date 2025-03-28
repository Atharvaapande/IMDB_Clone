const app = require("./app");
const sequelize = require("./config/db");

sequelize
  .sync({ force: false }) // Don't use `force: true` in production
  .then(() => console.log("✅ Database Synced"))
  .catch((err) => console.error("❌ Sync Error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
