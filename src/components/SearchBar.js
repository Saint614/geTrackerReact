import React, { useEffect, useState } from "react";
import { fetchItems, selectItemsError } from "../features/items/itemsSlice";
import { Button, FormGroup, Label, U } from "reactstrap";
import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const errMsg = useSelector(selectItemsError);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(fetchItems(values.item));
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{
          item: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormGroup>
            <Label htmlFor="item"></Label>
            <Field
              name="item"
              placeHolder="Enter Item Name"
              className="form-control"
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Search
          </Button>
        </Form>
      </Formik>
    </>
  );
};
