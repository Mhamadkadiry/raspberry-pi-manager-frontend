import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';

export default function OsSelector({ onOsSelect, selectedOs, selectedModel}) {
  const [os, setOs] = useState(selectedOs);
  const [open, setOpen] = useState(false);
  const [availableVersions, setAvailableVersions] = useState([]);

  useEffect(() => {
    console.log(selectedModel);
    if(selectedModel){
    axios.get(`http://localhost:5000/os-versions?model=${selectedModel}`)
      .then(response => {
        setAvailableVersions(response.data.availableVersions);
      })
      .catch(error => {
        console.error('Error fetching OS versions:', error);
      });
    }
  }, [selectedModel]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (version) => {
    setOs(version);
    handleClose();
  };
  useEffect(() => {
    onOsSelect(os);
  }, [os]);

  return (
    <div style={{ textAlign: "center", alignItems: 'center', padding: "20px" }}>
      <h1>Choose OS</h1>
        <Button color='warning' variant="contained" onClick={handleOpen} style={{ width: '50%' }}>
          {os || 'Choose OS'}
        </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select a Raspberry Pi OS</DialogTitle>
        <DialogContent>
          <List>
            {availableVersions.map((version, index) => (
              <ListItem button onClick={() => handleSelect(version)} key={index}>
                <ListItemText primary={version} />
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
