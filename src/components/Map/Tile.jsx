import React, { useState } from "react";
import AddImprovementDialog from "./AddImprovementDialog";
import "./styles/Tile.css";

const Tile = ({ index, improvement, addImprovement, updateResources, resources }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle opening the dialog
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  // Handle closing the dialog box
  const handleCloseDialog = () => {
    console.log('Dialog closed');
    setIsDialogOpen(false);
  };

  return (
    <div className="tile" onClick={() => handleOpenDialog(true)}>
      {improvement ? (
        <EditImprovementDialog
          improvement={improvement}
          updateResources={updateResources}
          resources={resources}
          closeDialog={handleCloseDialog}  // This is passed to EditImprovementDialog
        />
         <div className="tile-improvement">
          {/* Display the improvement's icon */}
          <img src={improvement.icon} alt={improvement.type} className="tile-icon" />
          {/* Display the improvement's level */}
          <div className="tile-level">Level {improvement.level}</div>
          </div>

      ) : (
        isDialogOpen && (
          <AddImprovementDialog
            index={index}
            addImprovement={addImprovement}
            resources={resources}
            onClose={handleCloseDialog}  // Pass handleCloseDialog to AddImprovementDialog as onClose
          />
        )
      )}
    </div>
  );
};

export default Tile;
