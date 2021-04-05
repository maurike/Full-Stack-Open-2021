import express from 'express';
import patientService from '../services/patientService';
import toNewPatient, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);

        const addedEntry = patientService.addPatient(newPatient);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);

    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const patient = patientService.findById(req.params.id);
        const newEntry = toNewEntry(req.body);

        if (patient && newEntry) {
            const addedEntry = patientService.addEntry(patient, newEntry);
            res.json(addedEntry);
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;