import React, { useState, useEffect } from 'react';
import './styles/EditImprovementDialog.css';
import { Improvements } from './Improvements';

const EditImprovementDialog = ({ improvement, updateResources, resources, closeDialog }) => {
  if (!improvement || !resources) {
    console.error("Invalid props:", { improvement, resources });
    return null; // Return null if props are invalid to avoid further errors
  }

  const [disableUpgrade, setDisableUpgrade] = useState(true); //disable upgrading by default.

  useEffect(() => {
    if (!improvement || !Improvements[improvement.type]) return;
    const costs = Object.fromEntries(
      Object.entries(Improvements[improvement.type].costs).map(([key, value]) => [
		key, 
		value * (improvement.level + 1)])
    );

    setDisableUpgrade(!Object.keys(resources).every(key => resources[key] >= costs[key]));
  }, [improvement, resources]); // Re-run when improvement or resources change

  const handleUpgrade = () => {
    const costs = Object.fromEntries(
      Object.entries(Improvements[improvement.type].costs).map(
        ([key, value]) => [key, -value * (improvement.level + 1)]
      )
    ); //Access improvement level and multiply costs x current level + 1
    updateResources(costs);
    improvement.level++; 
  };

  const handleDowngrade = () => {
    // TODO: Handle downgrade logic
  };

  const handleRemove = () => {
    // TODO: Handle remove logic
  };

  return (
    <div className='edit-improvement-dialog'>
      <h3>{improvement.type}</h3>
      <button disabled={disableUpgrade} onClick={handleUpgrade}> 
        Upgrade
      </button>
      <button onClick={handleDowngrade}>Downgrade</button>
      <button onClick={handleRemove}>Remove</button>
      <button onClick={closeDialog}>Close</button>
    </div>
  );
};

export default EditImprovementDialog;
