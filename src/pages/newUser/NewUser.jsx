import { useContext, useState } from "react";
import "./newUser.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext/UserContext";
import { createUser } from "../../context/userContext/apiCalls";

const NewUser = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { dispatch } = useContext(UserContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setUser({ ...user, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user, dispatch);
    navigate("/users");
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Profile Picture</label>
          <input type="file" id="file" name="profilePic" />
        </div>
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username..."
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email..."
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="text"
            name="password"
            placeholder="Enter password..."
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Admin</label>
          <select
            className="newUserSelect"
            name="isAdmin"
            onChange={handleSelect}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewUser;
