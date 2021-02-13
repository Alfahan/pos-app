import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Succes extends Component {
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/Success.png" width="500" />
        <h2>Success </h2>
        <p>Terimakasih Sudah memesan!</p>
        <Button varian="primary" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
