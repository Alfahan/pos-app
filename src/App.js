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

    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const carts = res.data;
        this.setState({ carts });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevState) {
    if (this.state.carts !== prevState.carts) {
      axios
        .get(API_URL + "keranjangs")
        .then((res) => {
          const carts = res.data;
          this.setState({ carts });
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const cart = {
            qty: 1,
            sub_total: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", cart)
            .then((res) => {
              swal({
                title: "Success!",
                text: "Success, In Cart " + cart.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const cart = {
            qty: res.data[0].qty + 1,
            sub_total: res.data[0].sub_total + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, cart)
            .then((res) => {
              swal({
                title: "Success!",
                text: "Success, In Cart " + cart.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { menus, chooseCategory, carts } = this.state;
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
              <Result carts={carts} />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
