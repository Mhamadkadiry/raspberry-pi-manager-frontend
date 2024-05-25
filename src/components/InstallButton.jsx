import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

function InstallButton({ selectedOs, selectedStorage, onInstallStart }) {
  const handleInstall = async () => {
    if (!selectedOs || !selectedStorage) {
      alert('Please select both an OS and a storage device.');
      return;
    }

    onInstallStart();

    try {
      const response = await axios.post('http://localhost:5000/api/install', {
        selectedOs,
        storage: selectedStorage,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error installing OS:', error);
      alert('Failed to install OS.');
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleInstall}>
      Install OS
    </Button>
  );
}

export default InstallButton;
