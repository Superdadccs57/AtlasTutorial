import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
	const [form, setForm] = useState({
		name: "",
		position: "",
		level: "",
		records: [],
	});
	const params = useParams();
	const navitate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const id = params.id.toString();
			const response = await fetch(
				`http:localhost:5000/record/${params.id.toString()}`
			);

			if (!response.ok) {
				const message = `An error has occured: ${response.statusText}`;
				window.alert(message);
				return;
			}
			const record = await response.json();
			if (!record) {
				window.alert(`Record with id ${id} not found`);
				navitate("/");
				return;
			}
			setForm(record);
		};
		fetchData();
		return;
	}, [params.id, navitate]);

	// These methods will update the state properties
	const updateForm = (value) => {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		const editePerson = {
			name: form.name,
			position: form.position,
			level: form.level,
		};
		// This will send a post request to update the data in the database
		await fetch(`http://localhost:5000/update/${params.id}`, {
			method: "POST",
			body: JSON.stringify(editePerson),
			headers: { "Content-Type": "application/json" },
		});
	};
	return (
		<div>
			<h3>Update Record</h3>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name:</label>
					<input
						type='text'
						className='form-control'
						id='name'
						value={form.name}
						onChange={(e) => updateForm({ name: e.target.value })}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='position'>Position:</label>
					<input
						type='text'
						className='form-control'
						id='position'
						value={form.position}
						onChange={(e) => updateForm({ position: e.target.value })}
					/>
				</div>
				<div className='form-group'>
					<div className='form-check formcheck-inline'>
						<input
							type='radio'
							className='form-check-input'
							name='positionOptions'
							id='positionIntern'
							value='Intern'
							checked={form.level === "Intern"}
							onchange={(e) => updateForm({ level: e.target.value })}
						/>
						<label htmlFor='positionIntern' className='form-check-label'>
							Intern
						</label>
					</div>
					<div className='form-check formcheck-inline'>
						<input
							type='radio'
							className='form-check-input'
							name='positionOptions'
							id='positionJunior'
							value='Junior'
							checked={form.level === "Junior"}
							onchange={(e) => updateForm({ level: e.target.value })}
						/>
						<label htmlFor='positionJunior' className='form-check-label'>
							Junior
						</label>
					</div>
					<div className='form-check formcheck-inline'>
						<input
							type='radio'
							className='form-check-input'
							name='positionOptions'
							id='positionSenior'
							value='Senior'
							checked={form.level === "Senior"}
							onchange={(e) => updateForm({ level: e.target.value })}
						/>
						<label htmlFor='positionSenior' className='form-check-label'>
							Senior
						</label>
					</div>
				</div>
				<br />
				<div className='form-group'>
					<input
						type='submit'
						className='btn btn-primary'
						value='Update Record'
					/>
				</div>
			</form>
		</div>
	);
};

export default Edit;
