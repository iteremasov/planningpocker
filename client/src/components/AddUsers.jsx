import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import { makeStyles } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class AddUsers extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.selectText = this.selectText.bind(this);
  }
  componentDidUpdate = () =>{
    if (this.state.anchorEl){
      this.selectText()
    }
  }
  selectText() {
    this.textInput.current.select();
  }
  state = {
    anchorEl: null
  }

  setAnchorEl = (e) => {
    this.setState({ anchorEl: e })
  }

  handleClick = (event) => {
    this.setAnchorEl(event.currentTarget);
  };

  handleClose = () => {
    this.setAnchorEl(null);
  };

  render() {
    const url = this.props.url
    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
          <PersonAddIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <Typography variant="h5" component="h2">
            Share this Link
        </Typography>
          <TextField inputRef={this.textInput} variant="outlined" margin="dense" value={url} size='small' />
          <CopyToClipboard text={url}>
            <Button onClick={this.selectText} >
              <FileCopyIcon />
            </Button>
          </CopyToClipboard>
        </Menu>
      </div>
    )
  }
}
