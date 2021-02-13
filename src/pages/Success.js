import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";
import axios from "axios";

export default class Succes extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const carts = res.data;
        carts.map((item) => {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
