import React, { Component } from "react";
import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalCarts from "./ModalCarts";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      cartDetails: false,
      qty: 0,
      keterangan: "",
      subTotal: 0,
    };
  }

  handleShow = (cartDetail) => {
    this.setState({
      showModal: true,
      cartDetails: cartDetail,
      qty: cartDetail.qty,
      keterangan: cartDetail.keterangan,
      subTotal: cartDetail.sub_total,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();
    const data = {
      qty: this.state.qty,
      sub_total: this.state.subTotal,
      product: this.state.cartDetails.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.cartDetails.id, data)
      .then((res) => {
        swal({
          title: "Update!",
          text: "Success, Update Cart " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteCart = (id) => {
    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        swal({
          title: "Delete!",
          text: "Delete, Delete Cart " + this.state.cartDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  plus = () => {
    this.setState({
      qty: this.state.qty + 1,
      subTotal: this.state.cartDetails.product.harga * (this.state.qty + 1),
    });
  };

  minus = () => {
    if (this.state.qty !== 1) {
      this.setState({
        qty: this.state.qty - 1,
        subTotal: this.state.cartDetails.product.harga * (this.state.qty - 1),
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
              deleteCart={this.deleteCart}
            />
          </ListGroup>
        )}
        <TotalBayar carts={carts} {...this.props} />
      </Col>
    );
  }
}
