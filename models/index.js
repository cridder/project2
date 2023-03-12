const User = require("./User");
const Employee = require("./Employee");

User.hasMany(Employee, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

Employee.belongsTo(User, {
	foreignKey: "user_id",
});

module.exports = { User, Employee };
