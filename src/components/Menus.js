import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

function Menus({ menu, cekInCart }) {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" onClick={() => cekInCart(menu)}>
        <Card.Img
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
          <Card.Title>
            <h6>
              {menu.nama}
              <br />
              <strong>{menu.kode}</strong>
            </h6>
            <hr />
          </Card.Title>
          <Card.Text>
            Rp. <strong>{numberWithCommas(menu.harga)}</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Menus;
