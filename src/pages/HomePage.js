import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Dropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { fetchItems } from "../features/items/itemsSlice";
import ItemsList from "../features/items/ItemsList";
import { SearchBar } from "../components/SearchBar";

const HomePage = () => {
  return (
    <Container>
      <Row className="row-content">
        <Col sm="6">
          <SearchBar />
          <h3>Items</h3>
        </Col>
        <ItemsList />
      </Row>
    </Container>
  );
};
export default HomePage;
