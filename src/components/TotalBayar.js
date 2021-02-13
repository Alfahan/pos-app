import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class TotalBayar extends Component {
  submitTotal = (total) => {
    const pesanan = {
      total_bayar: total,
      menus: this.props.carts,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/success");
    });
  };

  render() {
    const total = this.props.carts.reduce(function (result, item) {
      return result + item.sub_total;
    }, 0);

    return (
      <>
        {/* { WEB } */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h4>
                Total Bayar :{" "}
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(total)}
                </strong>
              </h4>
              <Button
                variant="primary"
                className="mb-3 mt-2 mr-2"
                size="lg"
                block
                onClick={() => this.submitTotal(total)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>

        {/* { Mobile } */}

        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h4>
                Total Bayar :{" "}
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(total)}
                </strong>
              </h4>
              <Button
                variant="primary"
                className="mb-3 mt-2 mr-2"
                size="lg"
                block
                onClick={() => this.submitTotal(total)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
