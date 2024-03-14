// UrlShortenerForm.tsx

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Custom Validation(email validation)

const UrlShortenerForm = () => {
    const [longUrl, setLongUrl] = useState('');
    const [valid, setValid] = useState(false);


 
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setLongUrl(inputValue);
    const isValid = emailRegex.test(inputValue); // Example: Email validation
    setValid(isValid);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Long URL submitted:', longUrl);
    setLongUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Enter long URL"
        variant="outlined"
        fullWidth
        value={longUrl}
        onChange={handleInputChange}
        margin="normal"
        required // Added input validation
        error={!valid} // Show error style if not valid (Validation feedback)
        helperText={!valid ? 'Please enter a valid email address' : ''}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        Shorten
      </Button>
    </form>
  );
};

export default UrlShortenerForm;
