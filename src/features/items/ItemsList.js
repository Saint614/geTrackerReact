import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Button, Alert } from "reactstrap";
import {
  fetchItems,
  selectAllItems,
  selectItemsError,
  itemsOrderedByName,
  itemsOrderedByValue,
} from "./itemsSlice";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Item from "./Item";

const ItemsList = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectAllItems);
  const isLoading = useSelector((state) => state.items.isLoading);
  const errMsg = useSelector(selectItemsError);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleSortByName = () => {
    dispatch(itemsOrderedByName());
  };

  const handleSortByValue = () => {
    dispatch(itemsOrderedByValue());
  };

  if (isLoading) {
    return <Loading />;
  }
  if (errMsg) {
    return (
      <>
        {<Alert color="danger">{errMsg}</Alert>}
        <Button color="dark" onClick={handleSortByName}>
          Sort by Name
        </Button>
        <Button color="dark" onClick={handleSortByValue}>
          Sort by Value
        </Button>
        <Col className="mt-4">
          {items.map((item) => {
            return (
              <div className="d-flex mb-5" key={item.name}>
                <Item item={item} />
              </div>
            );
          })}
        </Col>
      </>
    );
  }

  return (
    <>
      <Button color="dark" onClick={handleSortByName}>
        Sort by Name
      </Button>
      <Button color="dark" onClick={handleSortByValue}>
        Sort by Value
      </Button>
      <Col className="mt-4">
        {items.map((item) => {
          return (
            <div className="d-flex mb-5" key={item.name}>
              <Item item={item} />
            </div>
          );
        })}
      </Col>
    </>
  );
};

export default ItemsList;
