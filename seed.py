from app import app
from models import db, Item

db.drop_all()
db.create_all()

c1 = Item(
    name='Expensive graphics card',
    price=700,
)

c2 = Item(
    name='Bananas',
    price=5,
    rating=9,
)

db.session.add_all([c1, c2])
db.session.commit()