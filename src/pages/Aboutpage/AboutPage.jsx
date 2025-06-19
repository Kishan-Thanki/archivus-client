// src/pages/AboutPage.jsx
import React from 'react';
import { Box, Typography, Avatar, Grid, Paper } from '@mui/material';
import logo from '../../assets/logo.png';
import meet from '../../assets/Meet_Gandhi.jpeg';

const teamMembers = [
  { name: 'Kishan Thanki', role: 'Lead Developer', img: '' },
  { name: 'Meet Gandhi', role: 'Lead Developer', img: meet },
];

const AboutPage = () => (
  <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
    <Typography variant="h4" gutterBottom>About Us</Typography>
    <Typography variant="body1" paragraph>
      Welcome to Archivus! Our project is dedicated to providing seamless digital archiving solutions for everyone at DAU.
    </Typography>
    <Typography variant="body1" paragraph>
      We are addressing a common and important challenge: accessing previous years' question papers (PYQs). Archivus is a collaborative platform where anyone can contribute and access these papers, making learning and exam preparation easier for all.
    </Typography>
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom>Our Mission</Typography>
      <Typography variant="body2">
        Since DAU is a two-year program, time is limited. We wanted to create a common portal for all current and future students—a site that serves as a comprehensive paper vault for easy access to important resources.
      </Typography>
    </Box>
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom>Meet the Team</Typography>
      <Grid container spacing={3}>
        {teamMembers.map((member, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Avatar sx={{ width: 60, height: 64, mx: 'auto', mb: 1 }} src={member.img} />
              <Typography variant="subtitle1">{member.name}</Typography>
              <Typography variant="body2" color="text.secondary">{member.role}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <img
        src={logo}
        alt="Archivus Logo"
        style={{
          width: 200,
          height: 200,
          objectFit: 'cover',
          borderRadius: '50%',
          backgroundColor: '#f0f0f0',
          display: 'inline-block',
        }}
      />
    </Box>
  </Box>
);

export default AboutPage;
