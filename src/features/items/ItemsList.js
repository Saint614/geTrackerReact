import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";
import { fetchItems, selectAllItems } from "./itemsSlice";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Item from "./Item";

const ItemsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const items = useSelector(selectAllItems);
  const isLoading = useSelector((state) => state.items.isLoading);
  const errMsg = useSelector((state) => state.items.errMsg);

  return isLoading ? (
    <Loading />
  ) : errMsg ? (
    <Error errMsg={errMsg} />
  ) : (
    <Col className="mt-4">
      {items.map((item) => {
        return (
          <div className="d-flex mb-5" key={item.name}>
            <Item item={item} />
          </div>
        );
      })}
    </Col>
  );
};

export default ItemsList;
