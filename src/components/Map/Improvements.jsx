import React from "react";

export const Improvements = {
    house: {
        costs: { lumber: 5, grain: 5, water: 5, sheep: 1 },
        benefits: {people: 5}
    },
    field: {
        costs: { people: 1, water: 2 },
        benefits: {grain: 10}
    },
    pasture: {
        costs: { people: 1, grain: 2, water: 2 },
        benefits: {sheep: 5}
    },
    lumberMill: {
        costs: { people: 1 },
        benefits: {lumber: 10}
    },
    well: {
        costs: { people: 1, lumber: 2 },
        benefits: {water: 10}
    }
};

