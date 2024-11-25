export const handleChange = (e, setFormData) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const handleAddressChange = (newAddressData, setFormData) => {
  setFormData((prevData) => ({
    ...prevData,
    ...newAddressData,
  }));
};
