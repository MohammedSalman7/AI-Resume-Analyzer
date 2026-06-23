import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
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
        await registerUser(
          formData
        );

      setMessage(
        response.data.message
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data
          ?.message ||
          "Registration failed."
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
          Create Account
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={
              formData.name
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
            Register
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
          Already have an
          account?

          <span
            onClick={() =>
              navigate(
                "/login"
              )
            }
            className="
              text-blue-400
              cursor-pointer
              ml-2
            "
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;