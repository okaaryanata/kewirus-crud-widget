import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
  FormFeedback
} from "reactstrap";
import * as Api from "../api/Api";
import "../css/style.css";

class WidgetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      description: "",
      id: "",
      modalEdit: false,
      modalDelete: false,
      isNameEmpty: false,
      isDescEmpty: false,
      isPriceEmpty: false,
      accModalDelete: false,
      accModalUpdate: false
    };
    this.toggleDelete = this.toggleDelete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleModalDelete = this.toggleModalDelete.bind(this);
    this.toggleModalUpdate = this.toggleModalUpdate.bind(this);
    this.toggleAccModalDelete = this.toggleAccModalDelete.bind(this);
    this.toggleAccModalUpdate = this.toggleAccModalUpdate.bind(this);
  }
  toggleAccModalDelete() {
    this.setState({
      accModalDelete: true
    });
    Api.deleteWidget(this.state.data.id);
  }
  toggleAccModalUpdate() {
    this.setState({
      accModalUpdate: true
    });

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
        price: parseInt(this.state.price),
        description: this.state.description,
        id: this.state.id
      };
      Api.updateWidget(request);
    }
  }
  toggleModalUpdate(e) {
    this.toggleEdit(e);
    this.setState(prevState => ({
      modalEdit: !prevState.modalEdit
    }));
  }
  toggleModalDelete(e) {
    this.setState(prevState => ({
      modalDelete: !prevState.modalDelete
    }));
    this.toggleDelete(e);
  }
  toggleEdit(e) {
    var res = Api.getWidgetDetail(e.currentTarget.id);
    this.setState({
      id: res.id,
      name: res.name,
      price: res.price,
      description: res.description
    });
  }
  toggleDelete(e) {
    var res = Api.getWidgetDetail(e.currentTarget.id);
    this.setState({ data: res });
  }
  componentModalUpdate() {
    return (
      <div>
        <Modal isOpen={this.state.modalEdit} toggle={this.toggleModalUpdate}>
          <ModalHeader toggle={this.toggleModalUpdate}>Edit Widget</ModalHeader>
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
                  value={this.state.name}
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
                  value={Math.round(this.state.price)}
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
                  value={this.state.description}
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
            <Button outline color="secondary" onClick={this.toggleModalUpdate}>
              Batal
            </Button>{" "}
            <Button color="primary" onClick={this.toggleAccModalUpdate}>
              Ubah
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  componentModalDelete() {
    return (
      <div>
        <Modal isOpen={this.state.modalDelete} toggle={this.toggleModalDelete}>
          <ModalHeader toggle={this.toggleModalDelete}>
            Hapus Widget
          </ModalHeader>
          <ModalBody>Anda yakin akan menghapus data </ModalBody>
          <ModalFooter>
            <Button outline color="secondary" onClick={this.toggleModalDelete}>
              Batal
            </Button>{" "}
            <Button color="primary" onClick={this.toggleAccModalDelete}>
              Hapus
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Card className="mb-3 card" id={this.props.widget.slug}>
          <CardBody className="text-left">
            <CardTitle className="card-title">
              {this.props.widget.name}
            </CardTitle>
            <CardSubtitle className="price">
              {Api.formatMoney(this.props.widget.price)}
            </CardSubtitle>
            <CardText className="text-muted description">
              {this.props.widget.description.length > 47
                ? this.props.widget.description.substring(0, 40) + "..."
                : this.props.widget.description}
            </CardText>
          </CardBody>
          <CardFooter className="text-right">
            <Button
              outline
              color="secondary"
              id={this.props.widget.slug}
              onClick={this.toggleModalDelete}
              className="mr-2"
            >
              Hapus
            </Button>
            <Button
              id={this.props.widget.slug}
              onClick={this.toggleModalUpdate}
              color="primary"
            >
              Edit
            </Button>
          </CardFooter>
        </Card>
        {this.componentModalUpdate()}
        {this.componentModalDelete()}
      </div>
    );
  }
}

export default WidgetCard;
