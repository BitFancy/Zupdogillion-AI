from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    name = db.Column(db.String(256), nullable=False)
    is_active = db.Column(db.Boolean(), default=True)

    # Relationship to memes created by the user
    memes = db.relationship('Meme', backref='owner', lazy=True)

    def get_id(self):
        return self.id
    @staticmethod
    def get_user_by_email(email):
        user = User.query.filter_by(email=email).first()
        if user:
            return user.id
        return None

class Meme(db.Model):
    __tablename__ = 'meme'
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    meme_url = db.Column(db.String(200), nullable=False)
    meme_name = db.Column(db.String(200), nullable=False)
    prompt = db.Column(db.String(1000), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Use datetime.utcnow for creation time
    likes = db.Column(db.Integer, default=0)  # Default likes to 0

    def __repr__(self):
        return f'<Meme {self.caption} by {self.owner.email}>'

# Additional models can be added here as needed
