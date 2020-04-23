import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import { withRouter } from "react-router";
import AddUsers from './AddUsers'

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

function Header(props) {
  const classes = useStyles();

  return (
    <i className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <a href="/">Home</a>
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              PPocker
          </Typography>
          {console.log(window.location.href)}
          {console.log(window.location.pathname)}
            {
              window.location.pathname.length > 1 &&
                <AddUsers url={window.location.href} />
            }

          </Toolbar>
        </Container>
      </AppBar>
    </i>
  );
}

export default withRouter(Header)
