import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const raspberryPiVersions = [
    {
      code: 'b',
      text: 'Raspberry Pi 1 Model B'
    },
    {
      code: 'a',
      text: 'Raspberry Pi 1 Model A'
    },
    {
      code: 'b+',
      text: 'Raspberry Pi 1 Model B+'
    },
    {
      code: 'a+',
      text: 'Raspberry Pi 1 Model A+'
    },
    {
      code: '2b',
      text: 'Raspberry Pi 2 Model B'
    },
    {
      code: 'zero',
      text: 'Raspberry Pi Zero'
    },
    {
      code: '3b',
      text: 'Raspberry Pi 3 Model B'
    },
    {
      code: 'zero-w',
      text: 'Raspberry Pi Zero W'
    },
    {
      code: '3a+',
      text: 'Raspberry Pi 3 Model A+'
    },
    {
      code: '3b+',
      text: 'Raspberry Pi 3 Model B+'
    },
    {
      code: '4b',
      text: 'Raspberry Pi 4 Model B'
    },
    {
      code: '400',
      text: 'Raspberry Pi 400'
    },
    {
      code: 'zero-2-w',
      text: 'Raspberry Pi Zero 2 W'
    }
  ];  

export default function DeviceSelector({onDeviceSelect, selectedDevice}) {
  const [device, setDevice] = useState(selectedDevice);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (version) => {
    setDevice(version);
    onDeviceSelect(version);
    handleClose();
  };
  useEffect(() => {
    onDeviceSelect(device);
  }, [device]);


  return (
    <div style={{ textAlign: "center", alignItems: 'center', padding: "20px" }}>
      <h1>Choose Device</h1>
        <Button variant="contained" onClick={handleOpen} style={{ width: '50%' }}>
          {device ? "Raspberry Pi " + device : 'Choose Device'}
        </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select a Raspberry Pi Version</DialogTitle>
        <DialogContent>
          <List>
            {raspberryPiVersions.map((version, index) => (
              <ListItem button onClick={() => handleSelect(version.code)} key={index}>
                <ListItemText primary={version.text} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
