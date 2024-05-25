import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  height: '100%',
  lineHeight: '500px',
  margin: '100px',
}));

export default function Container({ children }) {
  return (
    <Item>
    {children}
  </Item>
  );
}