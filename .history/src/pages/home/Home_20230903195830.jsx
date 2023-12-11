import "./home.css";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { userData } from "../../dummyData";
import WidgetSmt from "../../components/widgetSmt/WidgetSmt";

const Home = () => {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSmt />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;