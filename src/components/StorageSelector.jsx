import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

const DriveListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: '10px',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '4px',
}));

function StorageSelector({ onStorageSelect, selectedStorage }) {
  const [drives, setDrives] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(selectedStorage);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/drives');
        setDrives(response.data);
      } catch (error) {
        console.error('Error fetching drives:', error);
      }
    };

    fetchDrives();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSelect = (drive) => {
    setSelectedDrive(drive);
    handleClose();
  };
  useEffect(() => {
    onStorageSelect(selectedDrive);
  }, [selectedDrive]);

  const getButtonLabel = () => {
    if (selectedDrive) {
      return `${selectedDrive.description} - ${selectedDrive.size ? (selectedDrive.size / 1024 / 1024 / 1024).toFixed(2) + ' GB' : 'N/A'}`;
    }
    return 'Choose Drive';
  };
  return (
    <div style={{ textAlign: "center", alignItems: 'center', padding: "20px" }}>
      <h1>Choose Storage</h1>
      <Button color='warning' variant="contained" onClick={handleOpen}>
        {getButtonLabel()}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select a Drive</DialogTitle>
        <DialogContent>
          <List>
            {drives.map((drive, index) => (
              <DriveListItem key={index} button onClick={() => handleSelect(drive)}>
                <ListItemText
                  primary={`${drive.description} - ${drive.size ? (drive.size / 1024 / 1024 / 1024).toFixed(2) + ' GB' : 'N/A'}`}
                  secondary={`Mounted as ${drive.mountpoints.map(mp => mp.path).join(', ')}`}
                />
              </DriveListItem>
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

export default StorageSelector;
