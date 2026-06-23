import { useNavigate } from "react-router-dom";
import {
  useAuth,
} from "../hooks/useAuth";
function Navbar() {
  const { user, logout } =
    useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-5
        mb-8
        flex
        justify-between
        items-center
      "
    >
      <h1
        className="
          text-2xl
          font-bold
          text-blue-400
        "
      >
        AI Resume Analyzer
      </h1>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <span
          className="
            text-slate-300
            font-semibold
          "
        >
          👤 Welcome,
          {" "}
          {user?.name}
        </span>

        <button
          onClick={
            handleLogout
          }
          className="
            bg-red-600
            hover:bg-red-700
            px-4
            py-2
            rounded-lg
            font-semibold
            transition
          "
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;