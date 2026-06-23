from flask import Flask
from flask_cors import CORS

from routes.upload_routes import upload_bp
from routes.report_routes import report_bp
from routes.history_routes import history_bp
from routes.auth_routes import auth_bp
from flask_jwt_extended import JWTManager
from routes.comparison_routes import comparison_bp
from routes.analyze_routes import (
    analyze_bp
)

app = Flask(__name__)
app.config[
    "JWT_SECRET_KEY"
] = "resume_analyzer_secret"

jwt = JWTManager(app)

# Enable CORS
CORS(app)

# Register Blueprints
app.register_blueprint(upload_bp)
app.register_blueprint(report_bp)
app.register_blueprint(history_bp)
app.register_blueprint(
    auth_bp
)
app.register_blueprint(
    comparison_bp
)
app.register_blueprint(
    analyze_bp
)


@app.route("/")
def home():
    return {
        "message":
        "AI Resume Analyzer Backend Running"
    }


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )