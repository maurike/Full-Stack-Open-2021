import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ coursePart }: { coursePart: CoursePart}) => {
    switch (coursePart.type) {
        case "normal":
            return (
                <div>
                    <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
                    <em>{coursePart.description}</em>
                </div>
            )
        case "groupProject":
            return (
                <div>
                    <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
                    <p>project exercises {coursePart.groupProjectCount}</p>
                </div>
            )
        case "submission":
            return (
                <div>
                    <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
                    <em>{coursePart.description}</em>
                    <p>submit to {coursePart.exerciseSubmissionLink}</p>
                </div>
            )
        case "special":
            return (
                <div>
                    <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
                    <em>{coursePart.description}</em>
                    <p>required skills: {coursePart.requirements.join(', ')}</p>
                </div>
            )
        default:
            return assertNever(coursePart);
    }
}

export default Part;
