import React from 'react';
import NavHeader from './NavHeader';
import Grid from 'react-flexbox-grid/lib/components/Grid';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import Snackbar from 'material-ui/lib/snackbar';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import ErrorMsg from './ErrorMsg';
import Paper from 'material-ui/lib/paper';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Link from 'react-router/lib/Link';

require('./App.scss');

const App  = React.createClass ({

  getInitialState() {
    return {
      isDialogOpen: false,
      isLeftNavOpen: false
    };
  },
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors.length)
      this.setState({ isDialogOpen: true});
  },
  closeDialog() {
    this.setState({ isDialogOpen: false});
    this.props.clearErr();
  },
  handleLeftNavToggle() {
    this.setState({isLeftNavOpen: !this.state.isLeftNavOpen});
  },
  handleLeftNavItemTap(link) {
    return () => {
      this.setState({isLeftNavOpen: false});
      this.props.linkTo(link);
    };
  },
  render() {
    const {isSnackbarOpen, errors, closeSnackbar, message} = this.props;
    const {isDialogOpen} = this.state;

    return (
      <div>
        <NavHeader {...this.props}
          isLeftNavOpen={this.state.isLeftNavOpen}
          handleLeftNavToggle={this.handleLeftNavToggle}
        />
        <Grid fluid style={{padding: '0 1em'}}>
          <Row center='xs'>
            <Col xs={12}>
            {this.props.children}
            </Col>
          </Row>
        </Grid>
        <Snackbar
          open={isSnackbarOpen}
          message={message}
          autoHideDuration={4000}
          onRequestClose={closeSnackbar}
        />
        <Dialog
          title="Error!"
          actions={
            <FlatButton
            label="Ok"
            secondary={true}
            onTouchTap={this.closeDialog} />
          }
          modal={false}
          open={this.state.isDialogOpen}
          onRequestClose={this.closeDialog}>
          <ErrorMsg errors = {errors}/>
        </Dialog>
        <LeftNav
          style={{top: 65}}
          open={this.state.isLeftNavOpen}
          docked={false}
          onRequestChange={isLeftNavOpen => this.setState({isLeftNavOpen})}
        >
            <MenuItem onTouchTap={this.handleLeftNavItemTap('/timers')}>
              Timers
            </MenuItem>
            <MenuItem onTouchTap={this.handleLeftNavItemTap('/timers/new')}>
              New Timer
            </MenuItem>
            <MenuItem onTouchTap={this.handleLeftNavItemTap('/timers/session')}>
              Session
            </MenuItem>
        </LeftNav>
      </div>
      );

  }
});

export default App;
