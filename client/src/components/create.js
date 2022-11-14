import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
	const [form, setForm] = useState({
		name: "",
		position: "",
		level: "",
	});
	const navigate = useNavigate();

	// Thes methods will update the state properties
	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}
	// This function will handle the submission
	async function onSubmit(e) {
		e.preventDefault();

		// When a post request is sent to the create url, we'll add a new recored to the database.
		const newPerson = { ...form };
		await fetch("http://localhost:5000/record/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPerson),
		}).catch((error) => {
			window.alert(error);
			return;
		});
		setForm({ name: "", position: "", level: "" });
		navigate("/");
	}
	// This section will display the form that takes the input from the user

	return (
		<div>
			<h3>Create New Record</h3>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						className='form-control'
						id='name'
						value={form.name}
						onChange={(e) => updateForm({ name: e.target.value })}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='position'>Position</label>
					<input
						type='text'
						className='form-control'
						id='position'
						value={form.position}
						onChange={(e) => updateForm({ position: e.target.value })}
					/>
				</div>
				<div className='form-group'>
					<div className='form-check form-check-inline'>
						<input
							type='radio'
							className='form-check-input'
							name='positionOptions'
							id='postitionIntern'
							value='Intern'
							checked={form.level === "Intern"}
							onChange={(e) => updateForm({ level: e.target.value })}
						/>
						<label htmlFor='positionIntern' className='form-check-label'>
							Intern
						</label>
					</div>
				</div>
				<div className='form-group'>
					<div className='form-check form-check-inline'>
						<input
							type='radio'
							className='form-check-input'
							name='positionOptions'
							id='postitionJunior'
							value='Junior'
							checked={form.level === "Junior"}
							onChange={(e) => updateForm({ level: e.target.value })}
						/>
						<label htmlFor='positionJunior' className='form-check-label'>
							Junior
						</label>
					</div>
				</div>
				<div className='form-group'>
					<div className='form-check form-check-inline'>
						<input
							type='radio'
							className='form-check-input'
							name='positionOptions'
							id='postitionSenior'
							value='Senior'
							checked={form.level === "Senior"}
							onChange={(e) => updateForm({ level: e.target.value })}
						/>
						<label htmlFor='positionJunior' className='form-check-label'>
							Senior
						</label>
					</div>
				</div>
				<div className='form-group'>
					<input
						type='submit'
						className='btn btn-primary'
						value='Create person'
					/>
				</div>
			</form>
		</div>
	);
}
