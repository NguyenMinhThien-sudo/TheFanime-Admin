import { useContext } from "react";
import "./featuredInfo.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { UserContext } from "../../context/userContext/UserContext";
import { useEffect } from "react";
import { getUsers } from "../../context/userContext/apiCalls";

const FeaturedInfo = () => {
  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);
  return (
    <div className="featured" style={{}}>
      <div className="featuredItem">
        <span className="featuredTitle">Total Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            ${users.reduce((sum, user) => sum + (user.vip ? 5 : 0), 0)},00
          </span>
          <span className="featuredMoneyRate">
            + <ArrowUpwardIcon className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">VIP Members</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            TT:{" "}
            {users
              .reduce((sum, user) => sum + (user.vip ? 1 : 0), 0)
              .toString()
              .padStart(2, "0")}
          </span>
          <span className="featuredMoneyRate">
            + <ArrowUpwardIcon className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Normal Members</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            TT:{" "}
            {users
              .reduce((sum, user) => sum + (!user.vip ? 1 : 0), 0)
              .toString()
              .padStart(2, "0")}
          </span>
          <span className="featuredMoneyRate">
            + <ArrowUpwardIcon className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
