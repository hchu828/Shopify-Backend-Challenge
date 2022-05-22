"""Flask app for Shopify Inventory System"""

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

from models import db, connect_db, Item, DEFAULT_IMAGE

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///shopify-inventory'
app.config['SQLALCHEMY_TRACK_MODFICATIONS'] = False
app.config['SECRET_KEY'] = 'super-secret-shopify-system'
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)


@app.get("/")
def root():
    """Render homepage"""

    return render_template("index.html")


@app.get("/items")
def list_items():
    """Return all items in system

    Returns JSON like:
        {items: [{id, name, price, image}, ...]}
    """

    filter = request.args.get("filter")
    print(filter)

    if filter is None:
        items = [item.to_dict() for item in Item.query.all()]

    elif filter == "current":
        items = [item.to_dict() for item in Item.query.filter_by(deleted=False)]
    return jsonify(items=items)


@app.get("/items/<int:item_id>")
def get_item_id(item_id):
    """Return data on specific item

    Returns JSON like:
        {item: [{id, name, price, image, deleted}]}
    """

    item = Item.query.get_or_404(item_id)
    return jsonify(item=item.to_dict())


@app.post("/items")
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


@app.patch("/items/<int:item_id>")
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


@app.delete("/items/<int:item_id>")
def mark_as_deleted(item_id):
    """Flag item as deleted

    Returns JSON like:
        {item: [{id, name, price, image, deleted}]}
    """

    item = Item.query.get_or_404(item_id)

    item.deleted = True
    print(item)

    db.session.add(item)
    db.session.commit()

    return jsonify(item=item.to_dict())

