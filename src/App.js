import React, { useState } from 'react';
import { Grid, Paper, styled } from '@mui/material';
import './App.css';
import Container from './components/Container';
import DeviceSelector from './components/DeviceSelector';
import OsSelector from './components/OsSelector';
import StorageSelector from './components/StorageSelector';
import InstallButton from './components/InstallButton';
import Progress from './components/Progress';

function App() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedOs, setSelectedOs] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [installing, setInstalling] = useState(false);

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };

  const handleOsSelect = (os) => {
    setSelectedOs(os);
  };

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
  };

  const handleInstallStart = () => {
    setInstalling(true);
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
            <Item><h1>Raspberry PI setup</h1></Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <DeviceSelector selectedDevice={selectedDevice} onDeviceSelect={handleDeviceSelect} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <OsSelector selectedOs={selectedOs} onOsSelect={handleOsSelect} selectedModel={selectedDevice} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <StorageSelector selectedStorage={selectedStorage} onStorageSelect={handleStorageSelect} />
            </Item>
          </Grid>
          {selectedDevice && selectedOs && selectedStorage && !installing && (
            <Grid item xs={12}>
              <Item>
                <InstallButton 
                  selectedOs={selectedOs} 
                  selectedStorage={selectedStorage} 
                  onInstallStart={handleInstallStart} 
                />
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
    </div>
  );
}

export default App;
