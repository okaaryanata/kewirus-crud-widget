import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";

import * as Api from "../api/Api";
import "../css/style.css";

class TopNavbar extends Component {
  constructor() {
    super();
    this.state = {
      modalAdd: false,
      name: "",
      price: 0,
      description: "",
      isNameEmpty: false,
      isDescEmpty: false,
      isPriceEmpty: false
    };
    this.toggle = this.toggle.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modalAdd: !prevState.modalAdd
    }));
  }
  onFormSubmit() {
    var isNameEmpty = false;
    var isPriceEmpty = false;
    var isDescEmpty = false;

    if (this.state.name === undefined || this.state.name === "") {
      isNameEmpty = true;
      this.setState({
        isNameEmpty: isNameEmpty
      });
    }
    if (this.state.price === undefined || this.state.price === 0) {
      isPriceEmpty = true;
      this.setState({
        isPriceEmpty: isPriceEmpty
      });
    }
    if (this.state.description === undefined || this.state.description === "") {
      isDescEmpty = true;
      this.setState({
        isDescEmpty: isDescEmpty
      });
    }

    if (
      isNameEmpty === false &&
      isPriceEmpty === false &&
      isDescEmpty === false
    ) {
      var request = {
        name: this.state.name,
        price: this.state.price,
        description: this.state.description
      };
      Api.addWidget(request);
    }
  }

  render() {
    return (
      <div>
        <Navbar className="navbar" expand="xs">
          <NavbarBrand href="/">
            <b className="navbar-logo">CRUD Widget</b>
          </NavbarBrand>
          <Collapse navbar>
            <Nav className="ml-auto" pills>
              <NavItem>
                <NavLink onClick={this.toggle} active>
                  Tambah Widget
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Modal isOpen={this.state.modalAdd} toggle={this.toogle}>
          <ModalHeader toggle={this.toggle}>Tambah Widget</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  invalid={this.state.isNameEmpty}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={e =>
                    this.setState({ name: e.target.value, isNameEmpty: false })
                  }
                />
                <FormFeedback>name can't be blank</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  invalid={this.state.isPriceEmpty}
                  type="number"
                  name="number"
                  id="price"
                  placeholder="0"
                  onChange={e =>
                    this.setState({
                      price: e.target.value,
                      isPriceEmpty: false
                    })
                  }
                />
                <FormFeedback>price can't be blank</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  invalid={this.state.isDescEmpty}
                  type="text"
                  name="description"
                  id="description"
                  placeholder="description"
                  onChange={e =>
                    this.setState({
                      description: e.target.value,
                      isDescEmpty: false
                    })
                  }
                />
                <FormFeedback>description can't be blank</FormFeedback>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button outline color="secondary" onClick={this.toggle}>
              Batal
            </Button>{" "}
            <Button color="primary" onClick={this.onFormSubmit}>
              Tambah
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TopNavbar;
