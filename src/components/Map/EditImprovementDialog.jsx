import React, { useState, useEffect } from "react";
import "./styles/EditImprovementDialog.css";
import { Improvements } from "./Improvements";

const EditImprovementDialog = ({
	improvement,
	updateResources,
	resources,
	closeDialog,
}) => {
	if (!improvement || !resources) {
		console.error("Invalid props:", { improvement, resources });
		return null; // Return null if props are invalid to avoid further errors
	}

	const [disableUpgrade, setDisableUpgrade] = useState(true); //disable upgrading by default.
	const [disableDowngrade, setDisableDowngrade] = useState(false); //disable upgrading by default.
	const [disableRemove, setDisableRemove] = useState(false); //disable Remove is resource will be zero

	const remove = Object.fromEntries(
		Object.entries(Improvements[improvement.type].costs).map(
			([key, value]) => [key, value * (improvement.level)]
		)
	);
	console.log(remove)

	const upgrades = Object.fromEntries(
		Object.entries(Improvements[improvement.type].costs).map(
			([key, value]) => [key, -value * (improvement.level + 1)]
		)
	);
	console.log(upgrades)

	useEffect(() => {
		if (!improvement || !Improvements[improvement.type]) return;
		const costs = Object.fromEntries(
			Object.entries(Improvements[improvement.type].costs).map(
				([key, value]) => [key, value * (improvement.level + 1)]
			)
		);

		setDisableUpgrade(
			!Object.keys(resources).every((key) => resources[key] >= costs[key])
		);
	}, [improvement, resources]); // Re-run when improvement or resources change

	useEffect(() => {
		if (!improvement || !Improvements[improvement.type]) return;
		const costs = Object.fromEntries(
			Object.entries(Improvements[improvement.type].costs).map(
				([key, value]) => [key, value * improvement.level]
			)
		);

		setDisableDowngrade(
			Object.keys(resources).every((key) => resources[key] >= (costs[key] || 0))
		);
		setDisableDowngrade(improvement.level === 1);
		setDisableRemove(
			Object.keys(resources).every((key) => resources[key] <= (costs[key] || 0))
		);
	}, [improvement, resources]); // Re-run when improvement or resources change

	const handleUpgrade = () => {
		const upCosts = Object.fromEntries(
			Object.entries(Improvements[improvement.type].costs).map(
				([key, value]) => [key, value * (improvement.level + 1)]
			)
		); //Access improvement level and multiply costs x current level + 1
		const upBenefits = Object.fromEntries(
			Object.entries(Improvements[improvement.type].benefits).map(
				([key, value]) => [key, value * (improvement.level + 1)]
			)
		); //Access improvement level and multiply costs x current level + 1
		updateResources(upCosts);
		updateResources(upBenefits);
		improvement.level++;
	};

	const handleDowngrade = () => {
		// TODO: Handle downgrade logic
		const downCosts = Object.fromEntries(
			//Access improvement level and multiply costs x current level
			Object.entries(Improvements[improvement.type].costs).map(
				([key, value]) => [key, -value * improvement.level]
			)
		);
		const downBenefits = Object.fromEntries(
			//Access improvement level and multiply costs x current level
			Object.entries(Improvements[improvement.type].benefits).map(
				([key, value]) => [key, -value * improvement.level]
			)
		);
		updateResources(downCosts);
		updateResources(downBenefits);
		improvement.level--;
	};

	const handleRemove = () => {
		// TODO: Handle remove logic
		const remCosts = Object.fromEntries(
			//Access improvement level and multiply costs x current level
			Object.entries(Improvements[improvement.type].costs).map(
				([key, value]) => [key, value * improvement.level]
			)
		);
		const remBenefits = Object.fromEntries(
			//Access improvement level and multiply costs x current level
			Object.entries(Improvements[improvement.type].benefits).map(
				([key, value]) => [key, -value * improvement.level]
			)
		);
		updateResources(remCosts);
		updateResources(remBenefits);
		delete improvement.type;
		delete improvement.level;
		delete improvement.index;
		closeDialog; // Call closeDialog as a function
	};

	return (
		<div className='edit-improvement-dialog'>
			<h3>{improvement.type}</h3>
			
			<div className='image-container'>
							<img className='styled-img' src={Improvements[improvement.type].icon} alt={improvement.type} />
						</div>
						<div className='details'>
							<h5 className='table-title'>Costs and Benefits</h5>
							<table className='modern-table'>
								<thead>
									<tr>
										<th></th>
										<th> Upgrade to Level {improvement.level + 1}</th>
										<th>Remove</th>
									</tr>
								</thead>
								<tbody>
									{Object.keys(upgrades).map((key) => (
										<tr key={key}>
											<td>{key}</td>
											<td>{upgrades[key]}</td>
											<td>{remove[key]}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className='button-container'>
					
							
							<button className='styled-button add-button' disabled={disableUpgrade} onClick={handleUpgrade}>
				Upgrade
			</button>
			<button disabled={disableDowngrade} onClick={handleDowngrade}>
				Downgrade
			</button>
			<button disabled={disableRemove} onClick={handleRemove}>
				Remove
			</button>
			<button className='styled-button close-button' onClick={closeDialog}>Close</button>
						</div>
		</div>
	);
};

export default EditImprovementDialog;
