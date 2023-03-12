const router = require("express").Router();
const { Employee } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
	try {
		const newEmployee = await Employee.create({
			...req.body,
			user_id: req.session.user_id,
		});

		res.status(200).json(newEmployee);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete("/:id", withAuth, async (req, res) => {
	try {
		const employeeData = await Employee.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		if (!employeeData) {
			res.status(404).json({ message: "No employee found with this id!" });
			return;
		}

		res.status(200).json(employeeData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
