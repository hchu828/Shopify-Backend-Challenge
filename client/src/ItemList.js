import React from "react";
import { Link } from "react-router-dom";
import {Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from "reactstrap";

function ItemList({items}) {
  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="fw-bold text-center">Items</CardTitle>

        <ListGroup>
          {items.map(item => (
            <Link to={`/${item.name}`} key={item.id}>
              <ListGroupItem>{item.name}</ListGroupItem>
            </Link>
          ))}
        </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default ItemList;