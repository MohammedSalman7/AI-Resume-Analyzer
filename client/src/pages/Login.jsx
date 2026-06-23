import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [message, setMessage] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const response =
        await loginUser(
          formData
        );

      const userData = {
  name:
    response.data.name,

  email:
    response.data.email,

  token:
    response.data.token,
};

      login(userData);

      setMessage(
        response.data.message
      );

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data
          ?.message ||
          "Login failed."
      );
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-slate-950
      "
    >
      <div
        className="
          bg-slate-900
          p-10
          rounded-2xl
          shadow-xl
          border
          border-slate-800
          w-full
          max-w-md
        "
      >
        <h2
          className="
            text-3xl
            font-bold
            text-center
            mb-8
          "
        >
          Login
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            required
            className="
              w-full
              p-3
              rounded-xl
              bg-slate-800
              border
              border-slate-700
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
            className="
              w-full
              p-3
              rounded-xl
              bg-slate-800
              border
              border-slate-700
            "
          />

          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Login
          </button>
        </form>

        {message && (
          <div
            className="
              mt-5
              text-center
              font-semibold
              text-green-400
            "
          >
            {message}
          </div>
        )}

        <p
          className="
            mt-6
            text-center
            text-slate-400
          "
        >
          Don't have an account?

          <span
            onClick={() =>
              navigate(
                "/register"
              )
            }
            className="
              text-blue-400
              cursor-pointer
              ml-2
            "
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;