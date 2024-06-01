import { useState, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";

const HomePage = () => {
  let itemsArr = [];
  const getItems = async () => {
    try {
      const resp = await fetch(baseUrl);
      const data = await resp.json();
      //trying to use a method to only return items with a value of over 1 million GP because returning everything is crashing the app
      itemsArr = data.filter(function (el) {
        return el.value >= 5000000;
      });
      console.log(itemsArr);
    } catch (error) {
      console.error(error);
    }
  };
  getItems();
  return (
    <Container>
      <Row>
        <Col>{itemsArr.name}</Col>
      </Row>
    </Container>
  );
};

export default HomePage;
