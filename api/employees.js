const router = require("express").Router();
const prisma = require("../db");

router.get("/", async (req, res) => {
  res.status(200).send("Welcome to the Prismatic Employees API");
});

router.get("/employees", async (req, res, next) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
});

router.post("/employees", async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Valid name is required" });
    }

    const newEmployee = await prisma.employee.create({
      data: {
        name: name.trim(),
      },
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
});

router.get("/employees/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
});

router.put("/employees/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Valid name is required" });
    }

    const existingEmployee = await prisma.employee.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const updatedEmployee = await prisma.employee.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name.trim(),
      },
    });

    res.status(200).json(updatedEmployee);
  } catch (error) {
    next(error);
  }
});

router.delete("/employees/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingEmployee = await prisma.employee.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    await prisma.employee.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
