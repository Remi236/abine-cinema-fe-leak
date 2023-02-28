import React, { useEffect, useRef, useState, Fragment, useContext } from 'react';
import { Card, CardBody, Col } from 'reactstrap';

import DataPaginationTable from '../../includes/DataPaginationTable';
import CustomPagination from '../../includes/CustomePagination';
import ButtonActionFommater from './ButtonActionFormatter';
import CustomModal from '../../includes/CustomModal';
import MovieForm from './MovieForm';
import {  SubmitContext } from '../../../contexts/submit.Context';

import {
  // createRows,
  filterRows,
  getRowsBySearchTerm,
  getDataRows,
} from '../../../helpers/tableHelper';
import {getData, BASE_API, ERROR_CODES} from '../../../api';

const MovieTable = () => {
  const heads = [
    {
      key: 'id',
      name: 'No',
      sortable: true,
    },
    {
      key: 'name',
      name: 'Name',
      sortable: true,
    },
    {
      key: 'publishDate',
      name: 'Public date',
      sortable: true,
    },
    {
      key: 'poster',
      name: 'Poster',
      // sortable: true,
    },
    {
      key: 'trailer',
      name: 'Trailer',
      // sortable: true,
    },
    {
      key: 'duration',
      name: 'Duration (minutes)',
      sortable: true,
    },
    {
      key: 'action',
      name: 'Action',
      formatter: ButtonActionFommater,
      width: 120,
    },
  ];

  const initialPageNumber = 1;
  const initialRowsCount = 10;

  const [rows, setRows] = useState([]);
  const [rowsToShow, setRowsToShow] = useState([]);
  const [pageOfItems, setPageOfItems] = useState(initialPageNumber);
  const [itemsToShow] = useState(initialRowsCount);
  const [sortDirection, setSortDirection] = useState("ASC");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const originalRows = useRef(rowsToShow);

  const { isSubmit, setIsSubmit } = useContext(SubmitContext);

  useEffect(() => {
  
    const getRow = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await getData("/movies",{
        Authorization: `Bearer ${access_token}`,
      });
      // console.log(response);
      return response;
    } 
    getRow().then((response) => {
      if(ERROR_CODES.includes(response.statusCode)) {
        alert(response.message);
        if(response.statusCode === "403") {
          window.location.href = "/403"
        }
        else {
          window.location.href = "/505";
        }
      }
      else {
        console.log(response);
<<<<<<< HEAD
=======
        Array.from(response).forEach(item => {
          item.publishDate = moment(item.publishDate).format("DD/MM/YYYY hh:mm:ss A");
          item.createdAt = moment(item.createdAt).format("DD/MM/YYYY hh:mm:ss A");
          item.updatedAt = moment(item.updatedAt).format("DD/MM/YYYY hh:mm:ss A");
        });
>>>>>>> 182db25 (fix managerment movie & screening)
        const initRows = response;
        const currentPageRows = filterRows(initRows);
  
        setRows(initRows);
        setRowsToShow(currentPageRows);
    
        originalRows.current = [...initRows];
      }
    }).catch(console.error);

  }, [isSubmit]);

  
 const onChangPage = (pageIndexOfItems) => {
    if (pageIndexOfItems) {
      const newRowsToShow = filterRows(rows, pageIndexOfItems, itemsToShow);
      setRowsToShow(newRowsToShow);
      setPageOfItems(pageIndexOfItems);
    }
  };

  const sortRows = (sortColumn, sortDirection) => {
    const sortedRows = sortDirection === "NONE" ? [...rows] : 
                      sortDirection === "ASC" ? [...rows].sort( ( a, b ) => a[sortColumn] === b[sortColumn] ? 0 :
                      a[sortColumn] > b[sortColumn]? 1: -1) :
                      [...rows].sort( ( a, b ) => a[sortColumn] === b[sortColumn] ? 0 :
                      a[sortColumn] > b[sortColumn]? -1: 1);
    return sortedRows;
  };

  const onSort = (sortColumn) => {
    const newRows = sortRows(sortColumn, sortDirection);
    const newDirections = sortDirection === "ASC" ? "DESC" : "ASC";
    setSortDirection(newDirections);
    setRowsToShow(newRows);
    return newRows;
  }

  const onFilter = (searchTerm, field, type) => {
    let filterRows = []; 
    if(searchTerm !== "") {
      filterRows = getRowsBySearchTerm(searchTerm, rows , field, type);
      setRowsToShow(filterRows);
      setRows(filterRows);
      setPageOfItems(initialPageNumber);
    }
    else {
      setRowsToShow(originalRows.current);
      setRows(originalRows.current);
    }
    return filterRows;
  }

  const onRowClick = (rowIdxSelected,rowSelecter) => {
    const rowSelected = getDataRows(rowIdxSelected,rowSelecter);
    console.log(rowSelected);
  }

  const handleClick = () => {
    setIsOpenModal(true);
  }

  const onAddSubmitting = errors => {

    const addMovieAPi = (valuesObject) => {
      const formData = new FormData();
      formData.append("file", valuesObject.file);
      formData.append("name", valuesObject.name);
      formData.append("publishDate", valuesObject.publishDate);
      formData.append("trailer", valuesObject.trailer);
      formData.append("duration", valuesObject.duration);

      const access_token = sessionStorage.getItem("access_token");
      fetch(`${BASE_API}/movies`, {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
        method: "POST",
        body: formData,
      }).then((res) => {
        // console.log('update response', res);
        return res.json();
      }).then(json => {
        // console.log(valuesObject);
        if(ERROR_CODES.includes(json.statusCode)) {

          if(json.statusCode === "403") {
            window.location.href = "/403"
          }
          else {
            window.location.href = "/505";
          }
        }
        else {
          alert("Add new record successfully!");
          setIsOpenModal(false);
          setIsSubmit(isSubmit => !isSubmit);
          console.log(json);
        }

      });
    }
    console.log(errors);
    const form = document.forms["movie_add_form"];
    // validate
    if(errors && Object.keys(errors).length === 0) {

      const valuesObject = {
        // id: form["elements"]["id"].value,
        name: form["elements"]["name"].value,
        publishDate: form["elements"]["publishDate"].value,
        file: form["elements"]["add_upload_file"].files[0],
        trailer: form["elements"]["trailer"].value,
        duration: form["elements"]["duration"].value,
      };

      addMovieAPi(valuesObject);
    }
    else {
      console.log("fix bug");
      
    }
  }

  const iconSummit = <span className="modal__title mdi mdi-plus-circle-outline"></span>;

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Data Movie</h5>
            </div>
            <div className="table__action w-100 my-3">
              <div className="table__search d-flex align-items-center justify-content-between input-group-sm">
                <input type="text" placeholder="Search by Name" className="table__search-input form-control" id="table__search_id" onChange={(e) => onFilter(e.target.value, "name", "string")} />
                <button className="btn btn-primary mb-0" onClick={() => handleClick()}>
                  <span>Add</span>
                  <span className="mdi mdi-plus-box-outline ms-2"></span>
                </button>
              </div>
                <Fragment>
                  <CustomModal 
                    title={`Add a new record`}
                    message={<MovieForm iconSummit={iconSummit} onSubmitting={onAddSubmitting} action="add"/>}
                    color="primary"
                    header={true}
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(isOpenModal => !isOpenModal)}
                  />
                </Fragment>
            </div>
            <DataPaginationTable
              heads={heads}
              rows={rowsToShow}
              onSorting={onSort}
              onRowClick={onRowClick}
            />
            <CustomPagination
              rows={rows}
              itemsCount={rows.length}
              itemsToShow={itemsToShow}
              pageOfItems={pageOfItems}
              onChangePage={onChangPage}
            />
        </CardBody>
      </Card>
    </Col>
  );
}

export default MovieTable;