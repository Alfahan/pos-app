import React, { Component } from "react";
import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalCarts from "./ModalCarts";
import TotalBayar from "./TotalBayar";

export default class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      cartDetails: false,
      qty: 0,
      keterangan: "",
    };
  }

  handleShow = (cartDetail) => {
    this.setState({
      showModal: true,
      cartDetails: cartDetail,
      qty: cartDetail.qty,
      keterangan: cartDetail.keterangan,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.targer.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  plus = () => {
    this.setState({
      qty: this.state.qty + 1,
    });
  };

  minus = () => {
    if (this.state.qty !== 1) {
      this.setState({
        qty: this.state.qty - 1,
      });
    }
  };

  render() {
    const { carts } = this.props;
    return (
      <Col md={3} mt="2">
        <h5>Result</h5>
        <hr />
        {carts.length !== 0 && (
          <ListGroup variant="flush">
            {carts.map((cartDetail) => (
              <ListGroup.Item
                key={cartDetail.product.id}
                onClick={() => this.handleShow(cartDetail)}
              >
                <Row>
                  <Col>
                    <Badge pill variant="success">
                      {cartDetail.qty}
                    </Badge>
                  </Col>
                  <Col>
                    <h6>{cartDetail.product.nama}</h6>
                    <p>Rp. {numberWithCommas(cartDetail.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      Rp. {numberWithCommas(cartDetail.sub_total)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ModalCarts
              handleClose={this.handleClose}
              {...this.state}
              plus={this.plus}
              minus={this.minus}
              changeHandler={this.changeHandler}
              handleSubmit={this.handleSubmit}
            />
          </ListGroup>
        )}
        <TotalBayar carts={carts} {...this.props} />
      </Col>
    );
  }
}
