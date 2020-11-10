import { useState } from "react";

export function useForm(data) {
  const [form, setForm] = useState(data);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setForm((prevForm) => {
      const validField = prevForm.hasOwnProperty(id);

      if (!validField) return prevForm;

      return {
        ...prevForm,
        [id]: value,
      };
    });
  };

  return { form, setForm, handleChange };
}
