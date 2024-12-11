import React, { useState } from "react";
import "./styles/AddImprovementDialog.css";
import { Improvements } from "./Improvements";
// import CloseDialogBox from "./CloseDialogButton";


const AddImprovementDialog = ({
  index,
  addImprovement,
  resources,
  closeDialog,
}) => {
  // Improvement types and their icons (locally managed here)
  const improvementOptions = [
    { type: "House", icon: "/house.png" },
    { type: "Field", icon: "/field.png" },
    { type: "Pasture", icon: "/pasture.png" },
    { type: "Lumber Mill", icon: "/lumbermill.png" },
    { type: "Well", icon: "/well.png" },
  ];

  // Handle improvement selection
  const handleAddImprovement = (type) => {
    const selectedImprovement = improvementOptions.find(
      (improvement) => improvement.type === type
    );
  
    addImprovement({
      index,
      type: selectedImprovement.type,
      icon: selectedImprovement.icon, // Include the icon
      level: 1,
    });
  
    closeDialog(); // Close the dialog
  };
  

  return (
    <div className="add-improvement-dialog">
      <h3>Select an Improvement</h3>
      <div className="improvement-grid">
        {improvementOptions.map((improvement) => (
          <button
            key={improvement.type}
            className="improvement-button"
            onClick={() => handleAddImprovement(improvement.type)}
          >
            <img
              src={improvement.icon}
              alt={improvement.type}
              className="improvement-icon"
            />
            <span>{improvement.type}</span>
          </button>
        ))}
      </div>
      <button className="close-dialog-button" onClick={closeDialog}>
        Cancel
      </button>
    </div>
  );
};

export default AddImprovementDialog;

