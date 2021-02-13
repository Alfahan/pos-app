import React, { Component } from "react";
import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

export default class Result extends Component {
  render() {
    const { carts } = this.props;
    return (
      <Col md={3} mt="2">
        <h5>Result</h5>
        <hr />
        {carts.length !== 0 && (
          <ListGroup variant="flush">
            {carts.map((cartDetail) => (
              <ListGroup.Item>
                <Row>
                  <Col>
                    <Badge pill variant="success">
                      {cartDetail.qty}
                    </Badge>
                  </Col>
                  <Col>
                    <h7>{cartDetail.product.nama}</h7>
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
          </ListGroup>
        )}
      </Col>
    );
  }
}
