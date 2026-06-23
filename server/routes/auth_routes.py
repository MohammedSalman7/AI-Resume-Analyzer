from database import get_db_connection
from flask import (
    Blueprint,
    request,
    jsonify
)

from flask_bcrypt import (
    Bcrypt
)

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

auth_bp = Blueprint(
    "auth_bp",
    __name__
)

bcrypt = Bcrypt()


@auth_bp.route(
    "/register",
    methods=["POST"]
)
def register():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if (
        not name or
        not email or
        not password
    ):
        return jsonify({
            "message":
            "All fields are required."
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # Check existing user
    cursor.execute(
        "SELECT * FROM users WHERE email = ?",
        (email,)
    )

    existing_user = (
        cursor.fetchone()
    )

    if existing_user:
        conn.close()

        return jsonify({
            "message":
            "Email already exists."
        }), 400

    hashed_password = (
        bcrypt.generate_password_hash(
            password
        ).decode("utf-8")
    )

    cursor.execute(
        """
        INSERT INTO users
        (
            name,
            email,
            password
        )
        VALUES
        (?, ?, ?)
        """,
        (
            name,
            email,
            hashed_password
        )
    )

    conn.commit()
    conn.close()

    return jsonify({
        "message":
        "Registration successful."
    }), 201


@auth_bp.route(
    "/login",
    methods=["POST"]
)
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email = ?",
        (email,)
    )

    user = cursor.fetchone()

    conn.close()

    if (
        not user or
        not bcrypt.check_password_hash(
            user["password"],
            password
        )
    ):
        return jsonify({
            "message":
            "Invalid credentials."
        }), 401

    access_token = (
        create_access_token(
            identity=email
        )
    )

    return jsonify({
        "message":
            "Login successful.",

        "token":
            access_token,

        "name":
            user["name"],

        "email":
            user["email"]
    }), 200


@auth_bp.route(
    "/profile",
    methods=["GET"]
)
@jwt_required()
def profile():

    email = (
        get_jwt_identity()
    )

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email = ?",
        (email,)
    )

    user = cursor.fetchone()

    conn.close()

    if user:
        return jsonify({
            "name":
                user["name"],
            "email":
                user["email"]
        }), 200

    return jsonify({
        "message":
        "User not found."
    }), 404