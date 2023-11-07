// const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

//   useEffect(() => {
//     resetForm();
//   }, [resetForm]);

//   const { name, email, password } = values;

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       return;
//     }

//     onRegister({
//       name: name,
//       email: email,
//       password: password,
//     });
//   };