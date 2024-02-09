export const handleInputChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  setFormData: React.Dispatch<React.SetStateAction<any>>
) => {
  const { name, value } = e.target;

  setFormData((prevState: any) => ({ ...prevState, [name]: value }));
};
