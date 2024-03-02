const users = require("../model/users");

const seedUserDummyData = async () => {
  // Generate dummy data here (similar to the previous example)
  const dummyUsers = [
    {
      name: "John Doe seeds",
      gender: "male",
      email: "john.doe@example.com",
      password: "password123",
    },
    {
      name: "Jane Smith seeds",
      gender: "female",
      email: "jane.smith@example.com",
      password: "securepassword",
    },
    // Add more user objects as needed
  ];

  try {
    await users.deleteMany({});

    // Insert dummy users into the database
    await users.insertMany(dummyUsers);
    console.log("Dummy data seeded successfully");
  } catch (error) {
    console.error("Error seeding dummy data:", error);
  }
};

module.exports = seedUserDummyData;
