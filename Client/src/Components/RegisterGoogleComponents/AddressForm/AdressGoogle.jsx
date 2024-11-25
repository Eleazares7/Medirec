import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getStates } from "../../../AxiosRequest/Adress/getStates.jsx";
import { getMunicipalities } from "../../../AxiosRequest/Adress/getMunicipalities.jsx";
import { getColonies } from "../../../AxiosRequest/Adress/getColonies.jsx";

export const AdressGoogle = ({ onAddressChange }) => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [colonies, setColonies] = useState([]);
  const [selectedColonia, setSelectedColonia] = useState("");

  //Get states
  useEffect(() => {
    const fetchStates = async () => {
      const statesData = await getStates();
      setStates(statesData);
    };
    fetchStates();
  }, []);

  // When this component changue this function says to father component
  useEffect(() => {
    onAddressChange({
      id_state: selectedState,
      id_municipality: selectedMunicipality,
      id_cologne: selectedColonia,
    });
  }, [selectedState, selectedMunicipality, selectedColonia]);

  //Detect when state change
  const handleStateChange = async (event) => {
    const stateId = event.target.value;
    setSelectedState(stateId);
    setMunicipalities([]);
    setColonies([]);
    const municipalitiesData = await getMunicipalities(stateId);
    setMunicipalities(municipalitiesData);
  };

  //Detect when muicipalities change
  const handleMunicipalityChange = async (event) => {
    const municipalityId = event.target.value;
    setSelectedMunicipality(municipalityId);
    setColonies([]);
    const coloniesData = await getColonies(municipalityId);
    setColonies(coloniesData);
  };

  return (
    <>
      <Form.Group controlId="formState" className="mb-3">
        <Form.Label>State</Form.Label>
        <Form.Control
          as="select"
          required
          value={selectedState}
          onChange={handleStateChange}
          name="formEstado"
        >
          <option value="">Selecciona tu estado</option>
          {Array.isArray(states) &&
            states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.state_name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formMunicipality" className="mb-3">
        <Form.Label>Municipio</Form.Label>
        <Form.Control
          as="select"
          required
          value={selectedMunicipality}
          onChange={handleMunicipalityChange}
          name="formMunicipio"
        >
          <option value="">Selecciona tu municipio</option>
          {Array.isArray(municipalities) &&
            municipalities.map((municipality) => (
              <option key={municipality.id} value={municipality.id}>
                {municipality.municipality_name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formCologne" className="mb-3"> 
        <Form.Label>Colonia</Form.Label>
        <Form.Control
          as="select"
          required
          value={selectedColonia}
          onChange={(e) => setSelectedColonia(e.target.value)}
          name="formColonia"
        >
          <option value="">Selecciona tu colonia</option>
          {Array.isArray(colonies) &&
            colonies.map((colonia) => (
              <option key={colonia.id} value={colonia.id}>
                {colonia.cologne_name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
    </>
  );
};
