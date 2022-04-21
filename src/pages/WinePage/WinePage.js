import React from "react";
import { Link, useLocation } from "react-router-dom";
import Wine from "../../components/Wine/Wine";
import SortModal from "../../modals/SortModal/SortModal";
import FilterModal from "../../modals/FilterModal/FilterModal";
import WineList from "../../components/WineList/WineList";
import "./WinePage.css";

const defaultLists = [
  {
    wineListID: 0,
    userID: 0,
    title: "Title 1",
    images: [
      "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      "https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png",
      "https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png",
      "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
    ],
    content: "Content 1",
    lastUpdatedAt: new Date(),
  },
  {
    wineListID: 1,
    userID: 1,
    title: "Title 2",
    images: [
      "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      "https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png",
      "https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png",
      "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
    ],
    content: "Content 2",
    lastUpdatedAt: new Date(),
  },
  {
    wineListID: 2,
    userID: 2,
    title: "Title 3",
    images: [
      "https://images.unsplash.com/photo-1566995541428-f2246c17cda1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      "https://images.vivino.com/thumbs/ygTg4K4vR5GYCjWTFocWng_pb_x600.png",
      "https://images.vivino.com/thumbs/8grEUdS1S4K9s7DQhmqyfg_pb_x600.png",
      "https://images.vivino.com/thumbs/g8BkR_1QRESXZwMdNZdbbA_pb_x600.png",
    ],
    content: "Content 3",
    lastUpdatedAt: new Date(),
  },
];

const WinePage = ({ lists = defaultLists, status, toggleStatus }) => {
  const location = useLocation();
  const theme = location.pathname.split("/")[2];
  const filterModal = status.filterModal;
  const sortModal = status.sortModal;
  const toggleFilterModal = () => toggleStatus("filterModal");
  const toggleSortModal = () => toggleStatus("sortModal");
  const formatTheme = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const displayWines = () => {
    const result = [];
    lists.forEach((each, i) => {
      result.push(<Wine />);
    });
    return result;
  };
  return (
    <div className="winePage">
      <div className="winePage__titleCont">
        <div className="winePage__text">Wines</div>
        <div className="winePage__title">{formatTheme(theme)}</div>
      </div>
      <div className="winePage__btnCont">
        <button className="winePage__filter" onClick={toggleFilterModal}>
          filter
        </button>
        <button className="winePage__sort" onClick={toggleSortModal}>
          sort
        </button>
      </div>
      {displayWines()}
      <FilterModal
        toggleFilterModal={toggleFilterModal}
        filterModal={filterModal}
      />
      <SortModal sortModal={sortModal} toggleSortModal={toggleSortModal} />
    </div>
  );
};

export default WinePage;
