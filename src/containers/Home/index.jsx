import React from 'react';
import { inject, observer } from 'mobx-react';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Table from '../../components/Table';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
}));

function Home({ allowance }) {
  const classes = useStyles();

  return (
    <div>
      <AppBar
        position="absolute"
        className={ clsx(classes.appBar) }
      >
        <Toolbar className={ classes.toolbar }>
          {/* There is already an h1 in the page, let's not duplicate it. */ }
          <Typography>
            Monthly Overview
          </Typography>
        </Toolbar>
      </AppBar>
      <Table />
    </div>
  )
}

export default inject("allowance")(observer(Home));
