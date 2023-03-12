const router = require("express").Router();
const userRoutes = require("./userRoutes");
const employeeRoutes = require("./employeeRoutes");

router.use("/users", userRoutes);
router.use("/employees", employeeRoutes);

module.exports = router;
