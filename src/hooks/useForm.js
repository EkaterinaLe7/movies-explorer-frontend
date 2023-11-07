import { useState, useCallback } from "react";
import isEmail from 'validator/es/lib/isEmail';

// export function useForm(inputValues={}) {
//     const [values, setValues] = useState(inputValues);
  
//     const handleChange = (event) => {
//       const {value, name} = event.target;
//       setValues({...values, [name]: value});
//     //   setValues({...values, [event.target.name]: event.target.value});
//     };
//     return {values, handleChange, setValues};
//   }


  export function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
  
    const handleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;

      if (name === 'name' && event.target.validity.patternMismatch) {
        event.target.setCustomValidity("Заполните поле, используя минимум 2 знака (только буквы, пробел или дефис).");
      } else if (name === 'email' && !isEmail(value)) {
        event.target.setCustomValidity("Заполните поле, используя верный формат почты.");
      } else {
        event.target.setCustomValidity('');
      }

      setValues({...values, [name]: value});
      setErrors({...errors, [name]: target.validationMessage });
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