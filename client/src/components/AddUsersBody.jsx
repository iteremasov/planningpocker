import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class AddUsersBody extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.selectText = this.selectText.bind(this);
  }
  componentDidUpdate = () => {
      this.selectText()
  }
  selectText() {
    this.textInput.current.select();
  }

  render() {
    const style = {
      textfield: {
        marginLeft: "3px"
      },
      copyIcon: {
        marginTop: "3%",
        marginRight: "1px"
      }
    }
    const url = this.props.url
    return (
      <div>
        <Typography variant="h5" component="h2">
          Share this Link
        </Typography>
        <TextField style={style.textfield} inputRef={this.textInput} variant="outlined" margin="dense" value={url} size='small' />
        <CopyToClipboard text={url}>
          <Button style={style.copyIcon} onClick={this.selectText} >
            <FileCopyIcon />
          </Button>
        </CopyToClipboard>
      </div>
    )
  }
}
