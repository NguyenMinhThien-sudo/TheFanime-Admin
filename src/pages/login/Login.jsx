import { useContext, useState } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }, dispatch);
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };
  return (
    <div className="login">
      <form className="loginForm">
        <span className="adTitle">Quản Trị Viên</span>
        <input
          type="text"
          placeholder="Email admin"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu admin"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
          disabled={isFetching}
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
