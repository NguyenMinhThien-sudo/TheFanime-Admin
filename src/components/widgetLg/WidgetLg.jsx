import { useState } from "react";
import "./widgetLg.css";
import { useEffect } from "react";
import axios from "axios";

const WidgetLg = () => {
  const [useStats, setUseStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users/transactions-stats",
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setUseStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, []);
  const Button = ({ type }) => {
    return <button className="widgetLgButton ">${type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Users</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Total</th>
          </tr>
          {useStats.map((useStat) => (
            <tr className="widgetLgTr" key={useStat._id}>
              <td className="widgetLgDate">{useStat._id}</td>
              <td className="widgetLgAmount">
                <div className="widgetLgBox">
                  {useStat.users.map((item) => (
                    <span
                      key={item.username}
                      style={{
                        textWrap: "wrap",
                        padding: "5px",
                        border: "1px solid #eee",
                        backgroundColor: "#eee",
                      }}
                    >
                      {item.username}
                    </span>
                  ))}
                </div>
              </td>
              <td className="widgetLgStatus">
                <Button
                  type={useStat.users
                    .reduce((sum, userItem) => sum + (userItem.vip ? 5 : 0), 0)
                    .toString()
                    .padStart(2, "0")}
                />
              </td>
              <td className="widgetLgTotal">
                <span style={{ padding: "3px" }}>
                  {useStat.users
                    .reduce((sum, userItem) => sum + (userItem.vip ? 1 : 0), 0)
                    .toString()
                    .padStart(2, "0")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WidgetLg;
