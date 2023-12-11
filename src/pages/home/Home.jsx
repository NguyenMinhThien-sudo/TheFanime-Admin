import "./home.css";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSmt from "../../components/widgetSmt/WidgetSmt";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Home = () => {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [useStats, setUseStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjgzYmRhMDhhYTIyZjY5ODgyN2IzNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NDM2NDc3NywiZXhwIjoxNjk0Nzk2Nzc3fQ.UNniXSNlsZvMmwK6uVmaSg0S9AudUeFJjr4d_T65yLA",
          },
        });
        const statsList = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUseStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={useStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSmt />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
