import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularColor() {
  return(
    <div className='loader'>
      <CircularProgress color="success" />
      </div>
  );
}