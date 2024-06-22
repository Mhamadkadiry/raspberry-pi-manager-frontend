import React, { useState } from 'react';
import { Grid, Paper, styled, Checkbox, FormControlLabel, Button } from '@mui/material';
import './App.css';
import Container from './components/Container';
import DeviceSelector from './components/DeviceSelector';
import OsSelector from './components/OsSelector';
import StorageSelector from './components/StorageSelector';
import InstallButton from './components/InstallButton';
import Progress from './components/Progress';
import UserConfigDialog from './components/UserConfigDialog';

function App() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedOs, setSelectedOs] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [installing, setInstalling] = useState(false);
  const [userConfigOpen, setUserConfigOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tpmSetup, setTpmSetup] = useState(false);

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };

  const handleOsSelect = (os) => {
    setSelectedOs(os);
  };

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
  };
  
  const handleUserConfigSubmit = (username, password) => {
    setUsername(username);
    setPassword(password);
    setInstalling(true);

    // Make API call to start the installation process
    fetch('http://localhost:5000/api/install', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedOs,
        storage: selectedStorage,
        username,
        password,
        tpmSetup,
      }),
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInstalling(false);
      }).catch((error) => {
        console.error('Error:', error);
        setInstalling(false);
      });
  };

  const handleUserConfigClose = () => {
    setUserConfigOpen(false);
  };

  const handleTpmSetupChange = (event) => {
    setTpmSetup(event.target.checked);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="wrapper">
      <Container elevation={0}>
        <Grid container spacing={2} style={{ padding: '10px' }}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Item style={{ background: "#0077c0", color: "#fff" }}><h1>Raspberry PI setup</h1></Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={{ background: "#0077c0", color: "#fff" }}>
              <DeviceSelector  disabled={installing} selectedDevice={selectedDevice} onDeviceSelect={handleDeviceSelect} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={{ background: "#0077c0", color: "#fff" }}>
              <OsSelector disabled={installing} selectedOs={selectedOs} onOsSelect={handleOsSelect} selectedModel={selectedDevice} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={{ background: "#0077c0", color: "#fff" }}>
              <StorageSelector disabled={installing} selectedStorage={selectedStorage} onStorageSelect={handleStorageSelect} />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <FormControlLabel
              disabled={installing}
                control={
                  <Checkbox checked={tpmSetup} onChange={handleTpmSetupChange} />
                }
                label="Enable TPM Setup"
              />
            </Item>
          </Grid>
          {selectedDevice && selectedOs && selectedStorage && !installing && (
            <Grid item xs={12}>
              <Item>
              <Button variant="contained" color="primary" onClick={()=>setUserConfigOpen(true)}>
                Install OS
              </Button>
              </Item>
            </Grid>
          )}
          {installing && (
            <Grid item xs={12}>
              <Item>
                <Progress />
              </Item>
            </Grid>
          )}
        </Grid>
      </Container>
      <UserConfigDialog
        open={userConfigOpen}
        onClose={handleUserConfigClose}
        onSubmit={handleUserConfigSubmit}
      />
    </div>
  );
}

export default App;
