import patientData from '../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
    const newPatient = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

export default { getEntries, getNonSensitiveEntries, addPatient };