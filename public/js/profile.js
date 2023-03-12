const newFormHandler = async (event) => {
	event.preventDefault();

	const name = document.querySelector("#employee-name").value.trim();
	const emp_rank = document.querySelector("#employee-ranking").value.trim();
	const description = document.querySelector("#employee-desc").value.trim();

	if (name && emp_rank && description) {
		const response = await fetch(`/api/employees`, {
			method: "POST",
			body: JSON.stringify({ name, emp_rank, description }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			document.location.replace("/profile");
		} else {
			alert("Failed to create employee");
		}
	}
};

const delButtonHandler = async (event) => {
	if (event.target.hasAttribute("data-id")) {
		const id = event.target.getAttribute("data-id");

		const response = await fetch(`/api/employees/${id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			document.location.replace("/profile");
		} else {
			alert("Failed to delete employee");
		}
	}
};

document
	.querySelector(".new-employee-form")
	.addEventListener("submit", newFormHandler);

document
	.querySelector(".employee-list")
	.addEventListener("click", delButtonHandler);
