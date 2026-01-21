import { useState } from 'react';

export function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateDescription = (value: string): boolean => {
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        description: 'Description is required',
      }));
      return false;
    }
    if (value.length < 3) {
      setErrors((prev) => ({
        ...prev,
        description: 'Description must be at least 3 characters',
      }));
      return false;
    }
    // Clear description error if valid
    setErrors((prev) => {
      const { description, ...rest } = prev;
      return rest;
    });
    return true;
  };

  const clearErrors = () => setErrors({});

  return { errors, validateDescription, clearErrors };
}
