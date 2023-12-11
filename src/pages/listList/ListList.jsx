import "./listList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";

const ListList = () => {
  const { lists, dispatch } = useContext(ListContext);
  const navigate = useNavigate();

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa phim này không?`
    );
    if (shouldDelete) {
      deleteList(id, dispatch);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const handleEditList = () => {
          navigate(`/list/${params.row._id}`, {
            state: { list: params.row },
          });
        };
        return (
          <>
            <button className="listListEdit" onClick={handleEditList}>
              Edit
            </button>
            <DeleteOutlineIcon
              className="listListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="listList">
      <DataGrid
        rows={lists}
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

export default ListList;
