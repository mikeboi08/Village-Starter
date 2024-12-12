import React, { useState } from "react";
import "./styles/AddImprovementDialog.css";
import { Improvements } from "./Improvements";

const AddImprovementDialog = ({
	index,
	addImprovement,
	resources,
	onClose, // Expect onClose prop here
}) => {
	const [type, setType] = useState("house");

	const handleAdd = () => {
		// Compare the cost of the selected improvement against current resources
		if (
			Object.keys(resources).every(
				(key) => resources[key] >= Improvements[type].costs[key]
			)
		) {
			// Add the improvement and close the dialog
			addImprovement({ index, type, level: 1 });
			onClose; // Ensure onClose is called to close the dialog
		} else {
			alert(`You don't have the resources for that!`);
		}
	};
	const filteredImprovements = Object.fromEntries(
		Object.entries(Improvements).filter(([key, value]) => value != 0)
	);
	return (
		<div className='add-improvement-dialog'>
			<label>
				Select Improvement:
				<select value={type} onChange={(e) => setType(e.target.value)}>
					<option value='House'>House</option>
					<option value='field'>Field</option>
					<option value='pasture'>Pasture</option>
					<option value='lumberMill'>Lumber Mill</option>
					<option value='well'>Well</option>
				</select>
			</label>
			<div>
				<img src={Improvements[type].icon} />
				<div className='details'>
					<h5>Costs</h5>
					<div>
						{Object.entries(filteredImprovements[type].costs).map(
							([key, value]) => (
								<p>
									{key}: {value}{" "}
								</p>
							)
						)}
					</div>
				</div>
				<div className='details'>
					<h5>Benefits</h5>
					<div>
						{Object.entries(filteredImprovements[type].benefits).map(
							([key, value]) => (
								<p>
									{key}: {value}{" "}
								</p>
							)
						)}
					</div>
				</div>
			</div>
			<button onClick={handleAdd}>Add</button>
			<button onClick={onClose}>Close</button>
		</div>
	);
};

export default AddImprovementDialog;
