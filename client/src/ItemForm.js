import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  Label,
  Input
} from "reactstrap";

function ItemForm({ initialFormData, addItem, handleSave }) {
  const defaultFormData = {   
    name: "",
    price: "",
    image: "",
  };

  const [form, setForm] = useState(
    initialFormData === undefined
    ? defaultFormData
    :initialFormData
  );

  const history = useHistory();

  const handleChange = evt => {
    const { name, value } = evt.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();

    if(addItem) {
      console.log("Adding item");
      addItem({...form});
    } else {
      console.log("Editing item");
      handleSave({...form});
    }

    history.push("/");
  }

  const { name, price, image } = form;

  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="fw-bold text-center">
            { addItem ? "Add Item" : "Edit Item"}
          </CardTitle>

          <Form onSubmit={handleSubmit}>

            <div className="mb-3">
              <Label for="name">Name</Label>
              <Input
                name="name"
                id="name"
                value={name}
                onChange={handleChange}
              />
            </div>

            {/* <div className="mb-3">
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={description}
                onChange={handleChange}
              />
            </div> */}

            <div className="mb-3">
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <Label for="Image">Image</Label>
              <Input
                type="text"
                name="image"
                id="image"
                value={image}
                onChange={handleChange}
              />
            </div>

            <Button className="float-end btn btn-outline-light">
              { addItem ? "Add Item" : "Submit Changes"}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </section>
  );
}

export default ItemForm;
