import React from 'react';
import { connect } from 'react-redux';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';

const mapStateToProps = (state, ownProps) => {
  const auth = state.auth;
  return {
    isAuthenticated: auth.isAuthenticated,
    username: (auth.user && auth.user.name)
  };
};

const _Dashboard = React.createClass({
  render() {
    const { isAuthenticated, username } = this.props;
    return (
      <Row center='xs'>
        <Col xs={6}>
        <h1> Hello {isAuthenticated ? username : 'unathenticated user'}! </h1>
        </Col>
      </Row>
    );
  }
});

const Dashboard = connect(
  mapStateToProps
)(_Dashboard);

export default Dashboard;
