import React, {useState, useEffect, useMemo, useContext, useCallback} from 'react';
import { Button } from 'reactstrap';

import CustomModal from '../../includes/CustomModal';
import ScreeningForm from './ScreeningForm';
import {SubmitContext} from '../../../contexts/submit.Context';
// import VALIDATE_TYPE from './validate';
import {GetOrDelete, PostOrPut, ERROR_CODES} from '../../../api';

const ButtonActionFormatter = ({ row }) => {
  const [messageJSX, setMessage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelModal, setIsOpenDelModal] = useState(false);

  const { setIsSubmit } = useContext(SubmitContext);

  const iconJSX = useMemo(() => <span className="modal__title mdi mdi-file-edit-outline"></span>, []);

  const onSubmitting = useCallback(
    (errors ) => {
      const id = row["id"];
      const updateRecord = async (valuesObject) => {
        const access_token = sessionStorage.getItem("access_token");
        const response = await PostOrPut(`screenings/${id}`, "PUT", valuesObject, {
          Authorization: `Bearer ${access_token}`,
        });
        return response;
      }

      const form = document.forms["screening_update_form"];
  
      console.log(errors);
      // close -> error x --> success ==> oke
      
      if(errors && Object.keys(errors).length === 0) {
  
        const valuesObject = {
          // cinemaComplexId: form["elements"]["cinema_complex_id"].value,
          cinemaId: form["elements"]["cinema_id"].value,
          movieId: form["elements"]["movie_id"].value,
          startTime: form["elements"]["startTime"].value,
          endTime: form["elements"]["endTime"].value,
          price: form["elements"]["price"].value,
        };
    
        updateRecord(valuesObject).then((response) => {
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
            alert(`Update record successfully!!!!`);
            console.log(response);
            setIsOpen(false);
            setIsSubmit(isSubmit => !isSubmit);
            setPageIndex(1);
          }
        }).catch(console.error);
        // console.log(valuesObject);
        
      }
    },
<<<<<<< HEAD
    [row,setIsSubmit],
=======
    [row,setIsSubmit,history,setPageIndex],
>>>>>>> 182db25 (fix managerment movie & screening)
  ); 

  useEffect(() => {
    const newMessageJSX = <ScreeningForm values={row} iconSummit={iconJSX} onSubmitting={onSubmitting} action="update" />;
    setMessage(newMessageJSX);
  }, [row, iconJSX, onSubmitting]);

  const onClose = (type, isOke) => {
    switch (type) {
      case "update":
        setIsOpen(false);
        // if(isOke) alert(`Update record successfully!!!!`);
        break;
      case "delete":
        setIsOpenDelModal(false);
        // if(isOke) alert(`Delete record successfully!!!!`);
        break;
      default:
        break;
    }
  }

  const handleClick = (type) => {
    switch (type) {
      case "update":
        setIsOpen(true);
        break;
      case "delete":
        setIsOpenDelModal(true);
        break;
      default:
        break;
    }
  }

  const buttonDeleteContent = <span className="modal__title mdi mdi-delete-alert-outline"></span>;
  const buttonCancelContent = <span className="modal__title mdi mdi-cancel"></span>;

  const onConfirm = (e) => {
    const id = row["id"];
    const delRecord = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await GetOrDelete(`screenings/${id}`, "DELETE", {
        Authorization: `Bearer ${access_token}`,
      });
      return response;
    }

    delRecord().then((response) => {
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
        alert(`Delete record successfully!!!!`);
        setIsOpenDelModal(false);
        setIsSubmit(isSubmit => !isSubmit);
      }
    }).catch(console.error);
    
  }

  return (
    <div className="button_group d-flex align-items-center justify-content-center w-100">
      <div className="d-none">{row["action"]}</div>
      <Button color="warning" onClick={() => handleClick("update")}>
        <span className="mdi mdi-file-edit-outline"></span>
      </Button>
      <CustomModal 
        title={`update record no ${row["id"]}`}
        message={messageJSX}
        color="primary"
        isOpen={isOpen}
        header={true}
        onClose={onClose}
        type="update"
      />
      <Button color="danger" className="me-0" onClick={() => handleClick("delete")}>
        <span className="mdi mdi-delete-outline"></span>
      </Button>
      <CustomModal 
        title={`delete record ${row["id"]} ?`}
        message={`Do you really wish to delete this record no (${row["id"]})? Becarefull that we won't take resposibilty anything about this record !!`}
        color="danger"
        buttonDelContent={buttonDeleteContent}
        buttonCancelContent={buttonCancelContent}
        isOpen={isOpenDelModal}
        onClose={onClose}
        onConfirm={onConfirm}
        type="delete"
      />
    </div>
  );
}

export default ButtonActionFormatter;