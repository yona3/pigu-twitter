import { useState } from 'react';

export const useForm = <T>(initialState: T) => {
  const [form, setForm] = useState<T>(initialState);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm(initialState);
  };

  return {
    form,
    setForm,
    handleChange,
    resetForm,
  };
};
