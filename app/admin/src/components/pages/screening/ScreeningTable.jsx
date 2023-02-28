import React, { useEffect, useRef, useState, Fragment, useContext } from 'react';
import { Card, CardBody, Col } from 'reactstrap';

import DataPaginationTable from '../../includes/DataPaginationTable';
import CustomPagination from '../../includes/CustomePagination';
import ButtonActionFommater from './ButtonActionFormatter';
import CustomModal from '../../includes/CustomModal';
import ScreeningForm from './ScreeningForm';
import {  SubmitContext } from '../../../contexts/submit.Context';

import {
  // createRows,
  filterRows,
  getRowsBySearchTerm,
  getDataRows,
} from '../../../helpers/tableHelper';

import {getData, PostOrPut, ERROR_CODES} from '../../../api';
const ScreeningTable = () => {
  const heads = [
    {
      key: 'id',
      name: 'No',
      sortable: true,
    },
    {
      key: 'startTime',
      name: 'Start Time',
      sortable: true,
    },
    {
      key: 'endTime',
      name: 'End Time',
      sortable: true,
    },
    {
      key: 'price',
      name: 'Price',
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
      const response = await getData("/screenings",{
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
          item.startTime = moment(item.startTime).format("DD/MM/YYYY hh:mm:ss A");
          item.endTime = moment(item.endTime).format("DD/MM/YYYY hh:mm:ss A");
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
    const addRecord = async (valuesObject) => {
      // console.log("inside",valuesObject);
      const access_token = sessionStorage.getItem("access_token");
      const response = await PostOrPut("screenings", "POST",valuesObject, {
        Authorization: `Bearer ${access_token}`,
      });
      return response;
    }

    const form = document.forms["screening_add_form"];
    // validate
    if(errors && Object.keys(errors).length === 0) {
      const valuesObject = {
        // id: form["elements"]["id"].value,
        // cinemaComplexId: form["elements"]["cinema_complex_id"].value,
        cinemaId: form["elements"]["cinema_id"].value,
        movieId: form["elements"]["movie_id"].value,
        startTime: form["elements"]["startTime"].value,
        endTime: form["elements"]["endTime"].value,
        price: form["elements"]["price"].value,
      };
      // console.log("outside",valuesObject);
      addRecord(valuesObject).then((response) => {
        // console.log(response);
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
          alert(`Add new record successfully!!!!`);
          console.log(response);
          setIsSubmit(isSubmit => !isSubmit);
          setIsOpenModal(false);
        }
      }).catch(console.error);
     
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
              <h5 className="bold-text">Data Screening</h5>
            </div>
            <div className="table__action w-100 my-3">
              <div className="table__search d-flex align-items-center justify-content-between input-group-sm">
                <input type="text" placeholder="Search by Price" className="table__search-input form-control" id="table__search_id" onChange={(e) => onFilter(e.target.value, "price", "int")} />
                <button className="btn btn-primary mb-0" onClick={() => handleClick()}>
                  <span>Add</span>
                  <span className="mdi mdi-plus-box-outline ms-2"></span>
                </button>
              </div>
                <Fragment>
                  <CustomModal 
                    title={`Add a new record`}
                    message={<ScreeningForm iconSummit={iconSummit} onSubmitting={onAddSubmitting} action="add"/>}
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

export default ScreeningTable;