import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import { withRouter } from "react-router";
import AddUsers from './AddUsers'
import { ReactComponent as MainIcon } from '../images/mainIcon.svg';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
              <Button href="/">
                <MainIcon />
              </Button>
            <Typography className={classes.title} variant="h6" noWrap>
              Pplanning
          </Typography>
            {
              window.location.pathname.length > 1 &&
              <AddUsers url={window.location.href} />
            }

          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default withRouter(Header)
