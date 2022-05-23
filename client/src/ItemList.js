import React from "react";
import {Card, CardBody, CardTitle, ListGroup } from "reactstrap";
import EditableItem from "./EditableItem";
function ItemList({items, editItem, deleteItem, undeleteItem, hardDeleteItem }) {

  return (
    <>
    {
      items.length === 0
      ?
        <div>You have no items. </div>
      :
        <section className="col-md-4">
          <Card>
            <CardBody>
              <CardTitle>All Items</CardTitle>
            <ListGroup>
              {items.map(i =>
                <Card key={i.id}>
                  <EditableItem 
                    item={i} 
                    editItem={editItem}
                    deleteItem={deleteItem}
                    undeleteItem={undeleteItem}
                    hardDeleteItem={hardDeleteItem}
                  />
                </Card> 
              )
              }
            </ListGroup>
            </CardBody>
          </Card>
        </section>
    }
    </>   
  );
}

export default ItemList;