import React, { useState } from "react";
import AddImprovementDialog from "./AddImprovementDialog";
import "./styles/Tile.css";




const Tile = ({ index, improvement, addImprovement, resources }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="tile" onClick={() => setDialogOpen(true)}>
      {improvement ? (
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
            closeDialog={() => setDialogOpen(false)}
          />
        )
      )}
    </div>
  );
};




export default Tile;


