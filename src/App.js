import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./App.css";
import {
  NavbarComponent,
  ListCategories,
  Result,
  Menus,
} from "../src/components/";
import { API_URL } from "./utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      chooseCategory: "Makanan",
      carts: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.chooseCategory)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeCategory = (value) => {
    this.setState({
      chooseCategory: value,
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  cekInCart = (value) => {
    const cart = {};

    axios
      .get(API_URL + "keranjangs" + value)
      .then((res) => {
        swal({
          title: "Success!",
          text: "Success Cek In Cart",
          icon: "success",
          button: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { menus, chooseCategory } = this.state;
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-2">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                chooseCategory={chooseCategory}
              />
              <Col>
                <h5>
                  <strong>List Produk</strong>
                </h5>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        cekInCart={this.cekInCart}
                      />
                    ))}
                </Row>
              </Col>
              <Result />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
