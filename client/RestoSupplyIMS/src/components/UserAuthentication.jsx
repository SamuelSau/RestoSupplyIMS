import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import '../styles/UserAuthentication.css'

const UserAuthentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform the login process here (e.g., call an API, validate credentials, etc.)
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div>
        <div className='login'>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
        </div>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
};

export default UserAuthentication;
