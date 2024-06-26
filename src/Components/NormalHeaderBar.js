import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

export default function NormalHeaderBar() {
    
  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ background: 'rgb(25,118,210)' }}>
        <Link to={"/"}><HomeIcon color='action' fontSize='large' /></Link>
        </Toolbar>
      </AppBar>
      </>
  );
}