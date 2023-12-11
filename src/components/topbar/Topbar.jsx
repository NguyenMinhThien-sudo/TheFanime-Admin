import "./topbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../context/authContext/AuthActions";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const accessLogout = window.confirm(
      "Bạn muốn đăng xuất khỏi trang quản trị TheFANIME?"
    );
    if (accessLogout) {
      dispatch(logout());
      navigate("/login");
    }
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">TheFANIME admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <img
            src="https://www.sgtiepthi.vn/wp-content/uploads/2022/01/270029116_1819941501728218_7459950680734546274_n.jpg"
            alt=""
            className="topAvatar"
          />
          <div className="topbarIconContainer" onClick={handleLogout}>
            <LogoutIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
