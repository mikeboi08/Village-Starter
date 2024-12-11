import React, { useState } from "react";
import "./styles/AddImprovementDialog.css";
import { Improvements } from "./Improvements";

const AddImprovementDialog = ({
  index,
  addImprovement,
  resources,
  onClose,  // Expect onClose prop here
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
      onClose();  // Ensure onClose is called to close the dialog
    } else {
      alert(`You don't have the resources for that!`);
    }
  };

  return (
    <div className="add-improvement-dialog">
      <label>
        Select Improvement:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="House">House</option>
          <option value="field">Field</option>
          <option value="pasture">Pasture</option>
          <option value="lumberMill">Lumber Mill</option>
          <option value="well">Well</option>
        </select>
      </label>
      <button onClick={handleAdd}>Add</button>
      <button onClick={onClose}>Close</button> 
    </div>
  );
  
};

export default AddImprovementDialog;
