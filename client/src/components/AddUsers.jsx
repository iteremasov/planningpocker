import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
  addIcon: {
    color: "white",
  },
  textfield: {
    marginLeft: "1px"
  },
  copyIcon: {
    marginTop: "3%",
    marginRight: "1px"
  }
}))

export default function AddUsers({ url }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <PersonAddIcon className={classes.addIcon} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Typography variant="h5" component="h2">
          Share this Link
        </Typography>
        <TextField className={classes.textfield} variant="outlined" margin="dense" defaultValue={url} disabled={true} size='small' />
        <CopyToClipboard text={url}>
          <Button className={classes.copyIcon}>
            <FileCopyIcon />
          </Button>
        </CopyToClipboard>
      </Menu>
    </div>
  );
}
