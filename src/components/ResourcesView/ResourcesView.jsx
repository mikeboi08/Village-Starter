import React from 'react';
import ResourceLine from './ResourceLine';
import './styles/ResourcesView.css';

const ResourcesView = ({ resources }) => (
  <div className="resources-view">
    {Object.entries(resources).map(([resource, amount]) => (
      <ResourceLine key={resource} resource={resource} amount={amount} />
    ))}
  </div>
);

export default ResourcesView;