import React, { useState, useEffect } from "react";
import "./styles/AddImprovementDialog.css";
import { Improvements } from "./Improvements";

const AddImprovementDialog = ({
  index,
  addImprovement,
  resources,
  onClose // Expect onClose prop here
}) => {
  // Improvement types and their icons (locally managed here)
  const improvementOptions = [
    { type: "House", icon: "/house.png" },
    { type: "Field", icon: "/field.png" },
    { type: "Pasture", icon: "/pasture.png" },
    { type: "Lumber Mill", icon: "/lumbermill.png" },
    { type: "Well", icon: "/well.png" },
  ];

  const [type, setType] = useState("House");
  const [selectedImprovement, setSelectedImprovement] = useState(improvementOptions[0]);

  useEffect(() => {
    const improvement = improvementOptions.find(option => option.type === type);
    if (improvement) {
      setSelectedImprovement(improvement);
    }
  }, [type]);

  const handleAdd = () => {
    // Compare the cost of the selected improvement against current resources
    if (
      Object.keys(resources).every(
        (key) => resources[key] >= Improvements[selectedImprovement.type].costs[key]
      )
    ) {
      // Add the improvement and close the dialog
      addImprovement({ 
        index, 
        type: selectedImprovement.type, 
        icon: selectedImprovement.icon, 
        level: 1 
      });
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
          {improvementOptions.map(option => (
            <option key={option.type} value={option.type}>{option.type}</option>
          ))}
        </select>
      </label>
      <div>
        <img 
          src={selectedImprovement.icon} 
          alt={selectedImprovement.type} 
        />
        <div>Costs: {/* Display costs here based on selectedImprovement */}</div>
        <div>Benefits: {/* Display benefits here based on selectedImprovement */}</div>
      </div>
      <button onClick={handleAdd}>Add</button>
      <button onClick={onClose}>Close</button> 
    </div>
  );
};

export default AddImprovementDialog;