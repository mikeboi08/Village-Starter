import React, { useState } from "react";
import Map from "./components/Map/Map";
import ResourcesView from "./components/ResourcesView/ResourcesView";
import "./styles/App.css";
import { Improvements } from "./components/Map/Improvements";
const initialResources = {
	//Object setting initial resources for game.
	lumber: 5,
	grain: 5,
	water: 5,
	sheep: 1,
	people: 0,
};

const App = () => {
	const [resources, setResources] = useState(initialResources); //useState for updating resources
	const [improvements, setImprovements] = useState([]); //useState for setting improvements on each tile in the map.

	const addImprovement = (improvement) => {
		//passes improvement to tile that user clicked.
		setImprovements([...improvements, improvement]); //passes in array of improvements up on line 16.
		const costs = Object.fromEntries(
			Object.entries(Improvements[improvement.type].costs).map(
				([key, value]) => [key, -value]
			)
		); //Negates the costs from the Improvements object to properly subtract values from the Resources.
		const benefits = Improvements[improvement.type].benefits; //Access the benefits from adding the Improvements
		updateResources(costs); //Subtract costs
		updateResources(benefits); //Add benefits
	};

	const updateResources = (resourceChanges) => {
		// calls dialog for updating resource when user clicks a tile containing a resource
		setResources((prev) =>
			Object.fromEntries(
				Object.entries(prev).map(([key, value]) => [
					key,
					value + (resourceChanges[key] || 0),
				])
			)
		);
	};

	return (
		<div className='app'>
			<ResourcesView resources={resources} />
			<Map
				improvements={improvements}
				addImprovement={addImprovement}
				updateResources={updateResources}
				resources={resources}
			/>
		</div>
	);
};

export default App;
