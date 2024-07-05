import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FirstComp: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  // Regular expressions for phone and email validation
  const phonePattern = /^\d{10}$/;
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  const handleSubmit = () => {
    let valid = true;

    // Reset error messages
    setNameError('');
    setPhoneError('');
    setEmailError('');

    // Validate name
    if (!name) {
      setNameError('Please enter your name');
      valid = false;
    }

    // Validate phone number
    if (!phone) {
      setPhoneError('Please enter your phone number');
      valid = false;
    } else if (!phonePattern.test(phone)) {
      setPhoneError('Invalid phone number. It should be exactly 10 digits.');
      valid = false;
    }

    // Validate email
    if (!email) {
      setEmailError('Please enter your email');
      valid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError('Invalid email format.');
      valid = false;
    }

    // If all validations pass, save user data to localStorage and navigate to the next page
    if (valid) {
      localStorage.setItem('user', JSON.stringify({ name, phone, email }));
      navigate('/second-page');
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        marginTop: 30
      }}
    >
      <h1>Login Here</h1>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        error={!!nameError}
        helperText={nameError}
        style={{ width: '30rem' }}
      />
      <TextField
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        error={!!phoneError}
        helperText={phoneError}
        style={{ width: '30rem' }}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        error={!!emailError}
        helperText={emailError}
        style={{ width: '30rem' }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ width: '30rem' }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default FirstComp;
