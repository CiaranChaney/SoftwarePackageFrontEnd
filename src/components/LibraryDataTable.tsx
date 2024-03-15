import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import LibraryUpload from "./LibraryUpload";

const token = localStorage.getItem("token");
const decodedToken = token && jwtDecode(token);
const isAdmin =
  decodedToken && decodedToken.roles && decodedToken.roles.includes("ADMIN");

const LibraryDataTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hashSearchQuery, setHashSearchQuery] = React.useState("");
  const [libraryUpload, setLibraryUpload] = useState("");

  const [listLibrary, setListLibrary] = useState<Library[]>([]);

  useEffect(() => {
    axios
      .get("http://63.33.88.86:7050/getLibraries")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setListLibrary(response.data);
        } else {
          console.error("Response data is not an array");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleLibraryUploadChange = (event) => {
    setLibraryUpload(event.target.files[0]);
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

  const filteredRows = rows.filter(
    (row) =>
      Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase()),
      ) && row.hash.toLowerCase().includes(hashSearchQuery.toLowerCase()),
  );

  return (
    <div>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          {" "}
          {}
          <TextField
            label="Search Library Name"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <LibraryUpload
            onFileUpload={(hashValue) => setHashSearchQuery(hashValue)}
          />
        </Grid>
      </Grid>

      <div style={{ height: 750, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
    </div>
  );
};

export default LibraryDataTable;
