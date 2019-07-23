import React, { Component } from "react";
import { logout } from "../../actions/authActions";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";

export class Logout extends Component {
  render() {
    return (
      <div>
        <NavLink onClick={this.props.logout}>Logout</NavLink>
      </div>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
