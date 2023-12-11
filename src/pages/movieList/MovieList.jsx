import "./movieList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";

const MovieList = () => {
  const { movies, dispatch } = useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(`Bạn có chắc muốn xóa phim này không?`);
    if (shouldDelete) {
      deleteMovie(id, dispatch);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="movieListItem">
            <img className="movieListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "imgTitle", headerName: "Name", width: 120 },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 80 },
    { field: "limit", headerName: "Limit", width: 80 },
    { field: "isSeries", headerName: "Series", width: 80 },
    { field: "desc", headerName: "Description", width: 80 },
    { field: "trailer", headerName: "Trailer", width: 120 },
    { field: "video", headerName: "Video", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const handleEditMovie = () => {
          navigate(`/movie/${params.row._id}`, {
            state: { movie: params.row },
          });
        };
        return (
          <>
            <button className="movieListEdit" onClick={handleEditMovie}>
              Edit
            </button>
            <DeleteOutlineIcon
              className="movieListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="movieList">
      <DataGrid
        rows={movies}
        columns={columns}
        disableSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default MovieList;
