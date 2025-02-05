from flask import Blueprint, render_template, request, jsonify, session, send_from_directory
from flask_login import logout_user, login_required, current_user
import uuid
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, create_refresh_token
from models import Meme, User, db
from flask_mail import Mail, Message
import requests
import os
from dotenv import load_dotenv
import random
import cloudinary
import cloudinary.uploader
from cloudinary import CloudinaryImage
from io import BytesIO

load_dotenv()

# Define the main blueprint for general app functionality
main = Blueprint('main', __name__)

# Define the auth blueprint for authentication-related routes
auth_bp = Blueprint('auth', __name__)
mail = Mail()

config = cloudinary.config(secure=True)

image_history = []

@main.route('/')
def home():
    return "Hello, backend!"

@main.route('/api/generate', methods=['POST'])
def generate():
    try:
        prompt = request.form.get('prompt', 'memes of a cat')
        overlay_text_top = request.form.get('overlay_text_top', 'Top Text Here')
        overlay_text_bottom = request.form.get('overlay_text_bottom', 'Bottom Text Here')
        
        response = requests.post(
            "https://api.stability.ai/v2beta/stable-image/generate/core",
            headers={
                "authorization": f"Bearer {os.getenv('STABILITY_API_KEY')}",
                "accept": "image/*"
            },
            files={"none": ''},
            data={
                "prompt": f"Generate a relatable meme about {prompt} that people can connect with, using a funny character or situation.",
                "output_format": "png",
            },
        )

        if response.status_code == 200:
            # Use BytesIO to handle the image data in memory
            image_data = BytesIO(response.content)

            # Upload the image to Cloudinary directly from memory
            upload_result = cloudinary.uploader.upload(
                image_data,
                public_id="quickstart_butterfly",
                unique_filename=False,
                overwrite=True
            )

            # Add text overlay using Cloudinary transformations
            image_with_text_url = cloudinary.CloudinaryImage('quickstart_butterfly').build_url(
                transformation=[
                    {'overlay': {'font_family': 'Arial', 'font_size': 120, 'text': overlay_text_top, 'font_color': 'red', 'opacity': 20, 'flags': 'layer_apply'}, 'width': 1000, 'height': 200, 'x': 0, 'y': 0, 'crop': 'fit'},
                    {'overlay': {'font_family': 'Arial', 'font_size': 100, 'text': overlay_text_bottom, 'font_color': 'red', 'opacity': 20, 'flags': 'layer_apply'}, 'width': 1000, 'height': 400, 'x': 0, 'y': 400, 'crop': 'fit'}
                ]
            )

            image_history.append(image_with_text_url)
            return jsonify({"image_url": image_with_text_url})
        else:
            return jsonify({"error": "Failed to generate image"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@main.route('/api/history', methods=['GET'])
def get_history():
    print('image_history ->', image_history)
    return jsonify({"history": image_history})
    
@main.route('/images/<path:filename>')
def send_image(filename):
    return send_from_directory('images', filename)

@main.route('/api/all_memes', methods=['GET'])
def all_memes():
    # Fetch all memes from the database
    # memes = Meme.query.all()
    memes = db.session.query(Meme, User.name).join(User).all()
    return jsonify([{
        'id': meme.id,
        'owner_id': meme.owner_id,
        'owner_name': owner_name,
        'meme_url': meme.meme_url,
        'meme_name': meme.meme_name,
        'prompt': meme.prompt,
        'category': meme.category,
        'created_at': meme.created_at,
        'likes': meme.likes
    } for meme, owner_name in memes])

@main.route('/api/save_memes', methods=['POST'])
def save_memes():
    data = request.get_json()
    email = data.get('user_email')
    print('user email ->', email)
    user_id = User.get_user_by_email(email)
    print('user id -> ', user_id)
    if user_id: 
        new_meme = Meme(
            owner_id=user_id,
            meme_url=data['meme_url'],
            meme_name=data['meme_name'],
            prompt=data['prompt'],
            category=data['category'],
            likes=0  # Initialize likes to zero
        )
        
        db.session.add(new_meme)
        try:
            db.session.commit()
            return jsonify({"message": "Meme saved successfully!"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "User not found"}), 404
    
# @auth_bp.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     email = data['email']
#     name = data['name']

#     # Check if user already exists
#     if User.query.filter_by(email=email).first():
#         return jsonify({"message": "User already exists!"}), 400
    
#     # Create a new user without a password field since using next-auth
#     new_user = User(email=email, name=name)
    
#     db.session.add(new_user)
#     db.session.commit()

#     return jsonify({"message": "User registered successfully!"}), 201

# @auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
    
#     if not data or 'email' not in data:
#         return jsonify({"message": "Missing email."}), 400
    
#     email = data['email']
    
#     user = User.query.filter_by(email=email).first()

#     if user:
#         access_token = create_access_token(identity=user.id)
#         refresh_token = create_refresh_token(identity=user.id)
        
#         return jsonify({
#             "access_token": access_token,
#             "refresh_token": refresh_token,
#             "user": {
#                 "id": user.id,
#                 "email": user.email,
#                 "name": user.name
#             }
#         }), 200

#     return jsonify({"message": "Invalid credentials"}), 401

# @auth_bp.route('/logout', methods=['POST'])
# @login_required
# def logout():
#     logout_user()
#     session.clear()
#     return jsonify({"message": "Logged out successfully!"}), 200

# @auth_bp.route('/protected', methods=['GET'])
# @login_required
# def protected():
#     return jsonify({"message": f"Hello {current_user.email}!"}), 200

# @auth_bp.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     data = request.get_json()
#     email = data['email']

#     user = User.query.filter_by(email=email).first()
    
#     if user:
#         reset_token = str(uuid.uuid4())
#         expiration_time = datetime.utcnow() + timedelta(hours=1)

#         user.reset_token = reset_token
#         user.token_expiration = expiration_time
#         db.session.commit()

#         msg = Message('Password Reset Request', sender='your-email@example.com', recipients=[email])
#         msg.body = f'Click the link to reset your password: http://localhost:3000/auth/reset-password/{reset_token}'
#         mail.send(msg)

#     return jsonify({"Message": "If that email is registered, you will receive a password reset link."}), 200

# @auth_bp.route('/reset-password/<token>', methods=['POST'])
# def reset_password(token):
#     data = request.get_json()
    
#     password = data['password']
    
#     user = User.query.filter_by(reset_token=token).first()

#     if user and user.token_expiration > datetime.utcnow():
#         user.set_password(password)  # Assuming you have a method to set the password hash in User model
#         user.reset_token = None
#         user.token_expiration = None
#         db.session.commit()

#         return jsonify({"message": "Password has been updated successfully."}), 200
    
#     return jsonify({"message": "Invalid or expired token."}), 400

