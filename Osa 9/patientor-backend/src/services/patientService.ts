import patientData from '../data/patients';
import { Patient, PublicPatient, NewPatientEntry, NewEntry } from '../types';
import {v1 as uuid} from 'uuid';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
    return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
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

const addEntry = ( patient: Patient, entry: NewEntry ): Patient => {
    const newEntry = {
        id: uuid(),
        ...entry
    };

    patient.entries.push(newEntry);
    return patient;
};

const findById = (id: string): Patient | undefined => {
    const entry = patients.find(p => p.id === id);
    return entry;
};

export default { getEntries, getNonSensitiveEntries, addPatient, addEntry, findById };