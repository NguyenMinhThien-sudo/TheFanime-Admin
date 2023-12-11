import { Link, useLocation, useNavigate } from "react-router-dom";
import "./list.css";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { updateList } from "../../context/listContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies } from "../../context/movieContext/apiCalls";

const List = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedType, setSelectedType] = useState([]);

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    if (state && state.list) {
      setFormData(state.list);

      if (state.list.content) {
        setSelectedMovies(state.list.content);

        if (state.list.type) {
          setSelectedType(state.list.type);
        }
      }
    }

    getMovies(dispatchMovie);
  }, [state, dispatchMovie]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedList = {
        ...formData,
        content: selectedMovies,
        type: selectedType,
      };
      await updateList(updatedList, dispatch);
      navigate("/lists");
    } catch (error) {
      console.error("Lỗi khi cập nhật danh sách:", error);
    }
  };
  return (
    <div className="list">
      <div className="listTitleContainer">
        <h1 className="listTitle">List</h1>
        <Link to="/newList">
          <button className="listAddButton">Create</button>
        </Link>
      </div>
      <div className="listTop">
        <div className="listTopRight">
          <div className="listInfoTop">
            <span className="listName">{formData.title}</span>
          </div>
          <div className="listInfoBottom">
            <div className="listInfoItem">
              <span className="listInfoKey">id:</span>
              <span className="listInfoValue"> {formData._id}</span>
            </div>
            <div className="listInfoItem">
              <span className="listInfoKey">Genre:</span>
              <span className="listInfoValue">{formData.genre}</span>
            </div>
            <div className="listInfoItem">
              <span className="listInfoKey">Type:</span>
              <span className="listInfoValue">{formData.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="listBottom">
        <form className="listForm" onSubmit={handleSubmit}>
          <div className="listFormLeft">
            <label>List Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
            />
            <label>Type</label>
            <select
              name="type"
              onChange={(e) => setSelectedType(e.target.value)}
              value={selectedType}
              style={{ height: "30px" }}
            >
              <option value="movies">movies</option>
              <option value="series">series</option>
            </select>
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre || ""}
              onChange={handleInputChange}
            />
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={(e) =>
                setSelectedMovies(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              value={selectedMovies}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className="listFormRight">
            <button className="listButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default List;
