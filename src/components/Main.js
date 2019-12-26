import React, { Component } from "react";
import WidgetCard from "./WidgetCard";
import { Container, Row, Col } from "reactstrap";
import * as Api from "../api/Api";
import "../css/style.css";

class Main extends Component {
  constructor() {
    super();

    this.state = {
      widget: [],
      modalAdd: false,
      modalEdit: false
    };
  }

  componentDidMount() {
    var widgets = Api.getAllWidget();
    this.setState({
      widget: widgets
    });
  }
  render() {
    var widgetCards = [];
    if (this.state.widget) {
      widgetCards = this.state.widget.map(widget => {
        return (
          <Col sm="6" md="6" lg="4">
            <WidgetCard widget={widget} />
          </Col>
        );
      });
    }
    return (
      <div className="main">
        <div className="container">
          <Container fluid className="">
            <div className="text-left header-main">
              <h4>
                <b>Dashboard Data Widget</b>
              </h4>
              <p className="text-muted">
                Di halaman ini akan ditampilkan data widget. Tidak hanya
                menampilkan, tapi bisa juga membuat, memperbaharui, dan
                menghapus data widget.
              </p>
            </div>
            <Row>{widgetCards}</Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Main;
