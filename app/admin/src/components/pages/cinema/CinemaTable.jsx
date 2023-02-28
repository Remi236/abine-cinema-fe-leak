import React, { useEffect, useRef, useState, Fragment, useContext } from 'react';
import { Card, CardBody, Col } from 'reactstrap';

import DataPaginationTable from '../../includes/DataPaginationTable';
import CustomPagination from '../../includes/CustomePagination';
import ButtonActionFommater from './ButtonActionFormatter';
import CustomModal from '../../includes/CustomModal';
import CinemaForm from './CinemaForm';
import {  SubmitContext } from '../../../contexts/submit.Context';

import {
  // createRows,
  filterRows,
  getRowsBySearchTerm,
  getDataRows,
} from '../../../helpers/tableHelper';
import {getData, PostOrPut, ERROR_CODES} from '../../../api';

const CinemaTable = () => {
  const heads = [
    {
      key: 'id',
      name: 'No',
      sortable: true,
      width: 80,
    },
    {
      key: 'name',
      name: 'Name',
      sortable: true,
    },
    {
      key: 'type',
      name: 'Type',
      sortable: true,
    },
    {
      key: 'width',
      name: 'Width',
      sortable: true,
    },
    {
      key: 'height',
      name: 'Height',
      sortable: true,
    },
    {
      key: 'createdAt',
      name: 'Created At',
      sortable: true,
    },
    {
      key: 'updatedAt',
      name: 'Updated At',
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
      const response = await getData("/cinemas",{
        Authorization: `Bearer ${access_token}`,
      });
      // console.log(response);
      return response;
    } 
    getRow().then((response) => {
      console.log(response);
      if(ERROR_CODES.includes(response.statusCode)) {
        alert(response.message);
        console.log(response.message);
        if(response.statusCode === "403") {
          window.location.href = "/403"
        }
        else {
          window.location.href = "/505";
        }
      }
      else {
        console.log(response);
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
    const addCinemaApi = async (valuesObject) => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await PostOrPut("cinemas", "POST", valuesObject, {
        Authorization: `Bearer ${access_token}`,
      });
      // console.log(response);
      return response;
    }

    const form = document.forms["cinema_add_form"];
    // validate
    if(errors && Object.keys(errors).length === 0) {
      const valuesObject = {
        // id: form["elements"]["id"].value,
        name: form["elements"]["name"].value,
        type: form["elements"]["type"].value,
        width: form["elements"]["width"].value,
        height: form["elements"]["height"].value,
        cinemaComplexId: form["elements"]["cinema_complex_id"].value,
      };
  
      console.log(valuesObject);
      
      addCinemaApi(valuesObject).then((response) => {
        if(ERROR_CODES.includes(response.statusCode)) {
          alert(response.message);
          console.log(response.message);
          if(response.statusCode === "403") {
            window.location.href = "/403"
          }
          else {
            window.location.href = "/505";
          }
        }
        else {
          console.log(response);
          alert(`Add new record successfully!!!!`);
          setIsSubmit(isSubmit => !isSubmit);
          setIsOpenModal(false);
        }
      }).catch(console.error)
      // setisSubmit(true);
      // form.submit();
      
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
              <h5 className="bold-text">Data Cinema</h5>
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
                    message={<CinemaForm iconSummit={iconSummit} onSubmitting={onAddSubmitting} action="add"/>}
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

export default CinemaTable;