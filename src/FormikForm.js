import React,{ useContext, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { VoiceContext } from "./VoiceController";


const FormikForm = () => {
    const voiceContext = useContext(VoiceContext);
    const [values, setValues] = useState({ username: "", password: "", email:"",name:"" });
    const signUpRef = useRef();
    useEffect(() => {
      voiceContext.setInputs(["username", "password", "email", "name", "submit"]);
      voiceContext.setRef(signUpRef)
    }, []);
  
    useEffect(() => {
      if (voiceContext.result){
        setValues({
            [Object.keys(voiceContext.result)[0]]:
              voiceContext.result[Object.keys(voiceContext.result)[0]],
          });
      }
        
    }, [voiceContext.result]);
  return (
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container maxWidth="sm">
          <Formik
          enableReinitialize
            initialValues={{
              email: values.email,
              name: values.name,
              username: values.username,
              password: values.password,
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .required('Email is required'),
                username: Yup.string()
                .required('username is required'),
              password: Yup.string()
                .max(255)
                .required('password is required'),
            })}
            onSubmit={values => {
                alert(values)
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Fullname"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
               
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    ref={signUpRef}
                  >
                    Sign up now
                  </Button>
                </Box>

              </form>
            )}
          </Formik>
        </Container>
      </Box>
  );
};

export default FormikForm;
