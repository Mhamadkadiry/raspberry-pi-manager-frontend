import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

function Progress() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Installing...');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'progress') {
        setProgress(message.progress);
      } else if (message.type === 'done') {
        setStatus('Installation Complete');
        setProgress(100);
      } else if (message.type === 'error') {
        setStatus('Installation Failed');
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <Typography variant="h6">{status}</Typography>
      { status === 'Installing...' && <LinearProgress />  }
    </div>
  );
}

export default Progress;
