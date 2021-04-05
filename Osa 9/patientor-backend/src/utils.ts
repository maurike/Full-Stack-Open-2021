import { NewPatientEntry, NewEntry, BaseEntry, Gender, Entry, Diagnose } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth');
    }

    return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): string => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
    if (entry.type === 'HealthCheck' || entry.type === 'Hospital' || entry.type === 'OccupationalHealthcare') {
        return true;
    } else {
        return false;
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntries = (entries: any): Entry[] => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
    entries.forEach((entry: any) => {
        if (!isEntry(entry)) {
            throw new Error('Incorrect or missing entries');
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }

    return date;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }

    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }

    return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose['code']> => {
    if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnosis codes');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return diagnosisCodes;
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatientEntry => {
    const newPatient: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries) || []
    };

    return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (newEntry: any): NewEntry => {
    let validEntry;

    if (isEntry(newEntry)) {
        validEntry = newEntry;
    } else {
        throw new Error('Entry not valid');
    }

    const entry: Omit<BaseEntry, 'id'> = {
        date: parseDate(validEntry.date),
        description: parseDescription(validEntry.description),
        specialist: parseSpecialist(validEntry.specialist),
        diagnosisCodes: parseDiagnosisCodes(validEntry.diagnosisCodes)
    };

    switch (validEntry.type) {
        case "HealthCheck":
            return {
                ...entry,
                type: validEntry.type,
                healthCheckRating: validEntry.healthCheckRating
            };
        case "Hospital":
            return {
                ...entry,
                type: validEntry.type,
                discharge: validEntry.discharge
            };
        case "OccupationalHealthcare":
            return {
                ...entry,
                type: validEntry.type,
                employerName: validEntry.employerName,
                sickLeave: validEntry.sickLeave
            };
        default:
            return assertNever(validEntry);
    }
};

export default toNewPatientEntry;