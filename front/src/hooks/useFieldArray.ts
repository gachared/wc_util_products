import { useState, useCallback } from 'react';

type Validator<T> = (value: T) => boolean;

export const useFieldArray = <T>(
  initialValues: T[],
  validation: Validator<T>
) => {
  const [values, setValues] = useState<T[]>(initialValues);
  const [errors, setErrors] = useState<boolean[]>(
    initialValues.map(() => false)
  );

  const handleChange = useCallback(
    (index: number, value: T) => {
      setValues((values) => {
        const newValues = [...values];
        newValues[index] = value;
        return newValues;
      });

      setErrors((errors) => {
        const newErrors = [...errors];
        newErrors[index] = validation(value);
        return newErrors;
      });
    },
    [validation]
  );

  return { values, errors, handleChange };
};
