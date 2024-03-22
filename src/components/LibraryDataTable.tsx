import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Button, Grid, TextField} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import LibraryUpload from "./LibraryUpload";
import "../css/LibraryUpload.css";
import ReactGA from "react-ga4";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactGA.initialize('G-QZSYBWE1M5');

ReactGA.send({ hitType: 'pageview', page: "/library"});

declare var localStorage: any;

const token = localStorage.getItem("token");
const decodedToken = token && jwtDecode(token);
const isAdmin =
  decodedToken && decodedToken.roles && decodedToken.roles.includes("ADMIN");

const LibraryDataTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hashSearchQuery, setHashSearchQuery] = useState("");
  const [listLibrary, setListLibrary] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    const toastMessage = localStorage.getItem("toastMessage");
    if (toastMessage) {
      toast.success(toastMessage, {
        onClose: () => {
          localStorage.removeItem("toastMessage");
        }
      });
    }

    fetchLibraryData();
  }, [currentPage, pageSize]);

  const fetchLibraryData = () => {
    axios
        .get("https://ciaranchaney.com:443/paginatedLibraries", {
          params: {
            pageNo: currentPage,
            pageSize: pageSize
          },
        })
        .then((response) => {
          if (Array.isArray(response.data.content)) {
            setListLibrary(response.data.content);
            setTotalRows(response.data.totalElements);
          } else {
            console.error("Response data is not an array");
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
  };

  const handlePaginationModelChange = (newModel: { page: React.SetStateAction<number>; pageSize: React.SetStateAction<number>; }) => {
    setCurrentPage(newModel.page);
    setPageSize(newModel.pageSize);
  };

  const handleNameSearch = () => {
    axios
        .get("https://ciaranchaney.com:443/searchLibrary", {
          params: { query: searchQuery },
        })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setListLibrary(response.data);
          } else {
            console.error("Invalid response data format");
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
  };

  const handleHashSearch = () => {
    axios
        .get("https://ciaranchaney.com:443/searchByHash", {
          params: { query: hashSearchQuery },
        })
        .then((response) => {
          if (response.data) {
            setListLibrary([response.data]);
          } else {
            console.error("No library found with that hash");
            setListLibrary([]);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
  };


  const columns = [
    { field: "libraryId", headerName: "Library ID", width: 100 },
    { field: "libraryName", headerName: "Library Name", width: 400 },
    { field: "version", headerName: "Version", width: 120 },
    { field: "createdAt", headerName: "Created At", width: 150 },
    {
      field: "hash",
      headerName: "Hash",
      width: 550,
    },
    {
      field: "edit",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <div>
          {isAdmin && (
            <a
              href={`/editlibrary/${params.row.libraryId}`}
              style={{ color: "#fff" }}
            >
              Edit
            </a>
          )}
        </div>
      ),
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "delete",
      headerName: "",
      width: 120,
      renderCell: (params) => (
        <div>
          {isAdmin && (
            <a
              href={`/deletelibrary/${params.row.libraryId}`}
              style={{ color: "#fff" }}
            >
              Delete
            </a>
          )}
        </div>
      ),
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
  ];

  const rows = listLibrary.map((library) => ({
    id: library.libraryId,
    libraryId: library.libraryId,
    libraryName: library.libraryName,
    version: library.version,
    createdAt: moment(library.createdAt).format("DD-MM-YYYY"),
    hash: library.hash ? library.hash.hashValue : "",
  }));


  return (
      <div>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} container justifyContent="center">
            <LibraryUpload
                onFileUpload={(hashValue) => setHashSearchQuery(hashValue)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
                label="Search by Hash"
                value={hashSearchQuery}
                onChange={(event) => setHashSearchQuery(event.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                className="search-button"
                onClick={handleHashSearch}
            >
              Search by Hash
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
                label="Search by Library Name"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                className="search-button"
                onClick={handleNameSearch}
            >
              Search by Name
            </Button>
          </Grid>

        </Grid>

        <div style={{height: 750, width: "100%"}}>
          <DataGrid
              rows={rows}
              columns={columns}
              pagination = {true}
              rowCount={totalRows}
              pageSizeOptions = {[25, 50, 100]}
              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 100 } } }}
              paginationMode="server"
              paginationModel={{ page: currentPage, pageSize }}
              onPaginationModelChange={handlePaginationModelChange}
          />

        </div>
      </div>
  );
};

export default LibraryDataTable;
