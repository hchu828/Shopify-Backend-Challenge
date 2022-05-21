"""Flask app for Shopify Inventory System"""

from flask import Flask, request, jsonify, render_template

from models import db, connect_db, Item, DEFAULT_IMAGE

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///shopify-inventory'
app.config['SQLALCHEMY_TRACK_MODFICATIONS'] = False
app.config['SECRET_KEY'] = 'super-secret-shopify-system'
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)


@app.get("/")
def root():
    """Render homepage"""

    return render_template("index.html")


@app.get("/api/items")
def list_all_items():
    """Return all non-deleted items in system

    Returns JSON like:
        {items: [{id, name, price, image}, ...]}
    """

    items = [item.to_dict() for item in Item.query.all()]
    return jsonify(items=items)


@app.post("/api/items")
def create_item():
    """Add item, and return data about newly-created item

    Returns JSON like:
        {item: [{id, name, price, image}]}
    """

    data = request.json

    item = Item(
        name=data['name'],
        price=data['price'],
        image=data['image'] or None
    )

    db.session.add(item)
    db.session.commit()

    return (jsonify(item=item.to_dict()), 201)


@app.patch("/api/items/<int:item_id>")
def update_item(item_id):
    """Update item from data in request. Return updated data.

    Returns JSON like:
        {item: [{id, name, price, image, deleted}]}
    """

    data = request.json
    item = Item.query.get_or_404(item_id)

    item.name = data.get('name', item.name)
    item.price = data.get('price', item.price)

    if "image" in data:
        item.image = data['image'] or DEFAULT_IMAGE

    db.session.add(item)
    db.session.commit()

    return jsonify(item=item.to_dict())


@app.delete("/api/items/<int:item_id>")
def delete_item(item_id):
    """Delete item and return confirmation message

    Returns JSON of {message: "Deleted"}
    """

    item = Item.query.get_or_404(item_id)

    db.session.delete(item)
    db.session.commit()

    return jsonify(deleted=item_id)

