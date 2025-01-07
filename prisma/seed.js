const prisma = require("../db");

const seed = async () => {
  const employees = [
    { name: "Justin" },
    { name: "Zach" },
    { name: "Shawn" },
    { name: "Arturo" },
    { name: "Isaac" },
    { name: "Jessica" },
    { name: "Andrea" },
    { name: "Lisa" },
    { name: "Russell" },
    { name: "Ryan" },
  ];

  try {
    await prisma.employee.createMany({
      data: employees,
    });
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
