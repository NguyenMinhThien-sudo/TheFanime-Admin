import "./user.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PublishIcon from "@mui/icons-material/Publish";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { updateUser } from "../../context/userContext/apiCalls";

const User = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const expDate = new Date();
  expDate.setDate(expDate.getDate() + 30);

  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    if (state && state.user) {
      setFormData(state.user);
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.vip) {
      formData.vipExpiration = expDate;
    }
    try {
      const updatedUser = {
        ...formData,
      };
      await updateUser(updatedUser, dispatch);
      navigate("/users");
    } catch (error) {
      console.error("Lỗi khi cập nhật thành viên:", error);
    }
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={formData.profilePic} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{formData.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{formData.username}</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{formData.email}</span>
            </div>
            <div className="userShowInfo">
              <AdminPanelSettingsIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {formData.vip ? "Yes" : "No"}
              </span>
            </div>
            <div className="userShowInfo">
              <AdminPanelSettingsIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {formData.isAdmin ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username || ""}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>VIP Expiration</label>
                <input
                  type="text"
                  name="vipExpiration"
                  value={formData.vip ? expDate : ""}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>VIP</label>
                <select
                  className="newUserSelect"
                  name="vip"
                  onChange={handleChange}
                  value={formData.vip || ""}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Admin</label>
                <select
                  className="newUserSelect"
                  name="isAdmin"
                  onChange={handleChange}
                  value={formData.isAdmin || ""}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={formData.profilePic || ""}
                  alt=""
                />
                <label htmlFor="file" className="uploadImage">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={handleSubmit}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
