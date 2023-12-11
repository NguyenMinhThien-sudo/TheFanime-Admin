import { Link, useLocation, useNavigate } from "react-router-dom";
import "./movie.css";
import PublishIcon from "@mui/icons-material/Publish";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../../firebase";

const Movie = () => {
  const [img, setImg] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { state } = useLocation();
  const { dispatch } = useContext(MovieContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({}); // State để lưu trạng thái form

  useEffect(() => {
    if (state && state.movie) {
      setFormData(state.movie);
    }
  }, [state]);

  const upload = (items) => {
    items.forEach((item) => {
      if (item.file) {
        const fileName = new Date().getTime() + item.label + item.file.name;
        const storageRef = ref(storage, `/items/${fileName}`);
        uploadBytes(storageRef, item.file)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((url) => {
                setFormData((prev) => {
                  return { ...prev, [item.label]: url };
                });
                setUploaded((prev) => prev + 1);
              })
              .catch((error) => {
                console.error("Error getting download URL:", error);
              });
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          });
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMovie(formData, dispatch);
      navigate("/movies");
    } catch (error) {
      console.error("Lỗi khi cập nhật bộ phim:", error);
    }
  };
  return (
    <div className="movie">
      <div className="movieTitleContainer">
        <h1 className="movieTitle">
          Movie {uploaded ? "(Has Been Uploaded)" : ""}
        </h1>
        <Link to="/newMovie">
          <button className="movieAddButton">Create</button>
        </Link>
      </div>
      <div className="movieTop">
        <div className="movieTopRight">
          <div className="movieInfoTop">
            <img src={formData.img} alt="" className="movieInfoImg" />
            <span className="movieName">{formData.title}</span>
          </div>
          <div className="movieInfoBottom">
            <div className="movieInfoItem">
              <span className="movieInfoKey">id:</span>
              <span className="movieInfoValue"> {formData._id}</span>
            </div>
            <div className="movieInfoItem">
              <span className="movieInfoKey">Genre:</span>
              <span className="movieInfoValue">{formData.genre}</span>
            </div>
            <div className="movieInfoItem">
              <span className="movieInfoKey">Year:</span>
              <span className="movieInfoValue">{formData.year}</span>
            </div>
            <div className="movieInfoItem">
              <span className="movieInfoKey">Limit:</span>
              <span className="movieInfoValue">{formData.limit}</span>
            </div>
            <div className="movieInfoItem">
              <span className="movieInfoKey">Series:</span>
              <span className="movieInfoValue">
                {formData.isSeries ? "true" : "false"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="movieBottom">
        <form className="movieForm">
          <div className="movieFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
            />
            <label>Name</label>
            <input
              type="text"
              name="imgTitle"
              value={formData.imgTitle || ""}
              onChange={handleInputChange}
            />
            <label>Description</label>
            <input
              type="text"
              name="desc"
              value={formData.desc || ""}
              onChange={handleInputChange}
            />
            <label>Year</label>
            <input
              type="text"
              name="year"
              value={formData.year || ""}
              onChange={handleInputChange}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre || ""}
              onChange={handleInputChange}
            />
            <label>Limit</label>
            <input
              type="text"
              name="limit"
              value={formData.limit || ""}
              onChange={handleInputChange}
            />
            <label>Trailer</label>
            <input
              type="file"
              name="trailer"
              onChange={(e) => setTrailer(e.target.files[0])}
            />
            <label>Video</label>
            <input
              type="file"
              name="video"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          <div className="movieFormRight">
            <div className="movieUpload">
              <img src={formData.img || ""} alt="" className="movieUploadImg" />
              <label htmlFor="img" className="uploadImage">
                <PublishIcon />
              </label>
              <input
                type="file"
                id="img"
                name="img"
                style={{ display: "none" }}
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            <button className="movieButton" onClick={handleUpload}>
              Upload
            </button>
            <button className="movieButton" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Movie;
