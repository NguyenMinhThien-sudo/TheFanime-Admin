import "./Sidebar.css";
import {
  LineStyle as LineStyleIcon,
  Timeline as TimelineIcon,
  AccountBox as AccountBoxIcon,
  VideoLibrary as VideoLibraryIcon,
  BarChart as BarChartIcon,
  DynamicFeed as DynamicFeedIcon,
  List as ListIcon,
  AddReaction as AddReactionIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Sidebar = () => {
  const sidebarItemsRef = useRef([]);

  const handleMenuClick = (event) => {
    const sidebarItems = sidebarItemsRef.current;

    sidebarItems.forEach((item) => {
      if (item === event.target) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <div className="sidebarTitleLine">
            <h3 className="sidebarTitle">Dashboard</h3>
            <div className="sidebarLine"></div>
          </div>
          <ul className="sidebarList" onClick={handleMenuClick}>
            <Link to="/" className="link">
              <li
                className="sidebarListItem active"
                ref={(el) => sidebarItemsRef.current.push(el)}
              >
                <LineStyleIcon className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/analytics" className="link">
              <li
                className="sidebarListItem"
                ref={(el) => sidebarItemsRef.current.push(el)}
              >
                <TimelineIcon className="sidebarIcon" />
                Analytics
              </li>
            </Link>
            <Link to="/report" className="link">
              <li
                className="sidebarListItem"
                ref={(el) => sidebarItemsRef.current.push(el)}
              >
                <BarChartIcon className="sidebarIcon" />
                Reports
              </li>
            </Link>
            <Link to="/new" className="link">
              <li
                className="sidebarListItem"
                ref={(el) => sidebarItemsRef.current.push(el)}
              >
                <AddReactionIcon className="sidebarIcon" />
                New
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <div className="sidebarTitleLine">
            <h3 className="sidebarTitle">Menu</h3>
            <div className="sidebarLine"></div>
          </div>
          <ul className="sidebarList" onClick={handleMenuClick}>
            <Link to="/users" className="link">
              <li
                className="sidebarListItem"
                ref={(el) => sidebarItemsRef.current.push(el)}
              >
                <AccountBoxIcon className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li
                className="sidebarListItem"
                ref={(el) => sidebarItemsRef.current.push(el)}
              >
                <VideoLibraryIcon className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/lists" className="link">
              <li
                className="sidebarListItem"
                ref={(el) => sidebarItemsRef.current.push(el)}
              >
                <ListIcon className="sidebarIcon" />
                Lists
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <div className="sidebarTitleLine">
            <h3 className="sidebarTitle">Notifications</h3>
            <div className="sidebarLine"></div>
          </div>
          <ul className="sidebarList" onClick={handleMenuClick}>
            <li
              className="sidebarListItem"
              ref={(el) => sidebarItemsRef.current.push(el)}
            >
              <DynamicFeedIcon className="sidebarIcon" />
              Feedback
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
