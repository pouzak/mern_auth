import React, { Component } from "react";
import {
  Button,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

//import uuid from 'uuid';
class LoginModal extends Component {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error != prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({
          msg: null
        });
      }
    }
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }); //sitas geriau nes galima keisti
    // this.setState({ name: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    this.props.login(user);
    // this.toggle();
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toogle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label form="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  onChange={this.onChange}
                />
                <br />
                <Label form="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  onChange={this.onChange}
                />
                <br />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginModal);
