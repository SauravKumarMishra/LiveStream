import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

export default function Header() {
  return (
    <div style={{ flexGrow: 1, marginBottom: '10px' }}>
      <AppBar position='static' style={{ background: '#ffff' }}>
        <Toolbar>
          <Typography variant='h6' style={{ flexGrow: 3 }}>
            <Link to='/' style={{ textDecoration: 'none' }}>
              STREAMER
            </Link>
          </Typography>
          <Typography variant='h6' style={{ flexGrow: 0 }}>
            <Link to='/' style={{ textDecoration: 'none' }}>
              All Streams
            </Link>
          </Typography>
          <GoogleAuth />
        </Toolbar>
      </AppBar>
    </div>
  );
}
