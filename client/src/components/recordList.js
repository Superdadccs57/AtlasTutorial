import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
	<tr>
		<td>{props.record.name}</td>
		<td>{props.record.position}</td>
		<td>{props.record.level}</td>
		<td>
			<Link className='btn btn-link' to={`/edit/${props.record._id}`}>
				Edit
			</Link>
			<button
				className='btn btn-link'
				onClick={() => {
					props.deleteRecord(props.record._id);
				}}>
				Delete
			</button>
		</td>
	</tr>
);

const RecordList = () => {
	const [records, setRecords] = useState([]);

	//This method fetches the records from the database
	useEffect(() => {
		const getRecords = async () => {
			const response = await fetch(`http://localhost:5000/record/`);
			if (!response.ok) {
				const message = `An Error occured: ${response.statusText}`;
				window.alert(message);
				return;
			}
			const records = await response.json();
			setRecords(records);
		};
		getRecords();
	}, [records.length]);

	// This method will delete a record
	const deleteRecord = async (id) => {
		await fetch(`http://localhost:5000/${id}`, { method: "DELETE" });
		const newRecords = records.filter((el) => el._id !== id);
		setRecords(newRecords);
	};
};

export default RecordList;
