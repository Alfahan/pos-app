// import logo from './logo.svg';
import { Row, Col, Container } from "react-bootstrap";
import "./App.css";
import { NavbarComponent, ListCategories, Result } from "../src/components/";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <div className="mt-2">
        <Container fluid>
          <Row>
            <ListCategories />
            <Col>
              <h4>Daftar Produk</h4>
              <hr />
            </Col>
            <Result />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
