import { useState, useCallback } from "react";
import isEmail from "validator/es/lib/isEmail";
import {
  INPUT_NAME_VALIDITY_ERROR_TEXT,
  INPUT_EMAIL_VALIDITY_ERROR_TEXT,
} from "../utils/constants";

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === "name" && target.validity.patternMismatch) {
      target.setCustomValidity(INPUT_NAME_VALIDITY_ERROR_TEXT);
    } else if (name === "email" && !isEmail(value)) {
      target.setCustomValidity(INPUT_EMAIL_VALIDITY_ERROR_TEXT);
    } else {
      event.target.setCustomValidity("");
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
