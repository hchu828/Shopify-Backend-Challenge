import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Label,
  Input
} from "reactstrap";

function DeleteItemForm({ handleSave }) {

  const [form, setform] = useState({msg: ""});

  const history = useHistory();

  const handleChange = evt => {
    const { name, value } = evt.target;
    setform(f => ({
      ...f,
      [name]: value
    }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();

    handleSave({...form})
    history.push("/");
  }

  const { msg } = form;

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Label for="msg">Message:</Label>
        <Input
          name="msg"
          id="msg"
          value={msg}
          onChange={handleChange}
        />
      </div>
      <Button>Delete Item</Button>
    </Form>);
}

export default DeleteItemForm;