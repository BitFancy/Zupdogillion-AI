from flask import Flask
from config import Config
from routes import main, auth_bp
from models import db, User
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.config.from_object(Config)

# Initialize database
db.init_app(app)
migrate = Migrate(app, db)

login_manager = LoginManager()

@login_manager.user_loader 
def load_user(user_id):
    return User.query.get(int(user_id))

# login_manager.login_view = 'auth.login'
login_manager.init_app(app)
jwt = JWTManager(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = "jackpassiondev07@gmail.com"
app.config['MAIL_PASSWORD'] = "aifgldgkfthj1"
mail = Mail(app)

# Register Blueprints
app.register_blueprint(main)
app.register_blueprint(auth_bp, url_prefix='/auth')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables if they don't exist
    app.run(port=5328, debug=True)
