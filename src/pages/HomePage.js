import { useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { fetchItems } from "../features/items/itemsSlice";
import ItemsList from "../features/items/ItemsList";

const HomePage = () => {
  return (
    <Container>
      <Row className="row-content">
        <Col sm="6">
          <h3>Items</h3>
        </Col>
        <ItemsList />
      </Row>
    </Container>
  );
};
export default HomePage;
