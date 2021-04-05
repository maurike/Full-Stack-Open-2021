import React from 'react';
import { Entry } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case "HealthCheck":
            return (
                <div>tsek</div>
            );
        case "Hospital":
            return (
                <div>hosp</div>
            );
        case "OccupationalHealthcare":
            return (
                <div>oc</div>
            );
        default:
            assertNever(entry);
    }
};

export default EntryDetails;
