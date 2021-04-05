import React from "react";
import axios from "axios";
import { Container, Icon, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails, addEntry } from "../state";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientDetailPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [{ diagnoses }] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientDetails(patientDetailsFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient?.id !== id) {
      void fetchPatientDetails();
    }
  }, [patient, id, dispatch]);

  const getGender = () => {
    if (patient?.gender === 'male') {
      return <Icon name="mars" />;
    } else if (patient?.gender === 'female') {
      return <Icon name="venus" />;
    } else {
      return <Icon name="genderless" />;
    }
  };

  const handleDiagnosis = (entry: Entry) => {
    const diagnosisList: (Diagnosis | undefined)[] = [];
    entry.diagnosisCodes?.map((d) => diagnosisList.push(diagnoses.find(diag => diag.code === d)));

    return (
      <ul>
        {diagnosisList.map(d => (
          <li key={d?.code}>{d?.code} {d?.name}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      <Container>
        <h3>{patient?.name} {getGender()}</h3>
        <p>ssn: {patient?.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
      </Container>
      <Container>
        <br/>
        <h2>Entries</h2>
        {patient?.entries.map((e) => (
          <div key={e.id}>
            <p>{e.date} {e.description}</p>
            {handleDiagnosis(e)}
          </div>
        ))}
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientDetailPage;
