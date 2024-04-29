import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {TextField} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import LibraryUpload from "./LibraryUpload";
import ReactGA from "react-ga4";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ThreeCircles} from "react-loader-spinner";
import 'bootstrap/dist/css/bootstrap.css';

ReactGA.initialize('G-QZSYBWE1M5');

ReactGA.send({ hitType: 'pageview', page: "/library"});

declare var localStorage: any;

const token = localStorage.getItem("token");
const decodedToken = token && jwtDecode(token);
const isAdmin =
  decodedToken && decodedToken.roles && decodedToken.roles.includes("ADMIN");

interface Library {
    libraryId: number;
    libraryName: string;
    version: string;
    createdAt: string;
    hash: {
        hashValue: string;
    };
}

const LibraryDataTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hashSearchQuery, setHashSearchQuery] = useState("");
  const [listLibrary, setListLibrary] = useState<Library[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);

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
            setLoading(false)
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
            // @ts-ignore
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
            // @ts-ignore
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
      renderCell: (params: { row: { libraryId: any; }; }) => (
        <div>
          {isAdmin && (
            <a className={"btn btn-warning"}
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
      renderCell: (params: { row: { libraryId: any; }; }) => (
        <div>
          {isAdmin && (
            <a className={"btn btn-danger"}
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
        <div className={"col"}>
          <ToastContainer/>
        </div>

        <div className={"row"}>
          <div className={"container-fluid"}>
            <div className={"row"}>
              <div className={"col-lg-4 col-md-6 mb-3"}>
                <TextField
                    label="Search by Library Name"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <a className={"btn btn-dark btn-lg mt-2"}
                   onClick={handleNameSearch}
                   role="button">
                  Search by Name
                </a>
              </div>

              <div className={"col-lg-4 col-md-6 mb-3"}>
                <LibraryUpload
                    onFileUpload={(hashValue: React.SetStateAction<string>) => setHashSearchQuery(hashValue)}
                />
              </div>

              <div className={"col-lg-4 col-md-12 mb-3"}>
                <TextField
                    label="Search by Hash"
                    value={hashSearchQuery}
                    onChange={(event) => setHashSearchQuery(event.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <a className={"btn btn-dark btn-lg mt-2"}
                   onClick={handleHashSearch}
                   role="button">
                  Search by Hash
                </a>
              </div>
            </div>

            <div className={"row"}>
              <div className={"col"}>
                <div className={"mt-3 mb-3"}>
                  {loading ? (
                      <ThreeCircles
                          visible={true}
                          height="100"
                          width="100"
                          color="#ffffffff"
                          ariaLabel="three-circles-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                      />
                  ) : (
                      <div className={"col-10 mx-auto"}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pagination={true}
                            rowCount={totalRows}
                            pageSizeOptions={[25, 50, 100]}
                            initialState={{pagination: {paginationModel: {page: 0, pageSize: 100}}}}
                            paginationMode="server"
                            paginationModel={{page: currentPage, pageSize}}
                            onPaginationModelChange={handlePaginationModelChange}
                        />
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


  );
};

export default LibraryDataTable;
