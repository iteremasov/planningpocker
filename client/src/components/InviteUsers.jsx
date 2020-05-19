import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from '@material-ui/core/styles';

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles((theme) => ({
  addIcon: {
    color: "white",
  },
}));

export function InviteUsers({ url }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (anchorEl !== null && inputRef.current) {
      inputRef.current.select();
    }
  }, [anchorEl]);

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
        <MenuItem>
          <Typography variant="h5" component="h2">
            Share this Link
          </Typography>
        </MenuItem>
        <MenuItem>
          <TextField inputRef={inputRef} variant="outlined" margin="dense" value={url} size='small' />
          <CopyToClipboard text={url}>
            <Button>
              <FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </MenuItem>
      </Menu>
    </div>
  );
}
