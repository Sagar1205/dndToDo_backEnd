require("dotenv").config();
const { Sequelize } = require("sequelize");


// module.exports = new Sequelize("todolist", "postgres", "nikhilmalik", {
//   host: "localhost",
//   dialect: "postgres",
// });

// module.exports = new Sequelize(
//   process.env.POSTGRES_DATABASE,
//   process.env.POSTGRES_USER,
//   process.env.POSTGRES_PASSWORD,
//   {
//     host: process.env.POSTGRES_HOST,
//     dialect: "postgres",
//   }
// );

module.exports = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres", // Explicitly specifying the dialect
  // Additional options (optional)
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // For self-signed certificates
    },
  },
});
