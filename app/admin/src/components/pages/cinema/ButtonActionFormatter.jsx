import React, {useState, useEffect, useMemo, useContext, useCallback} from 'react';
import { Button } from 'reactstrap';

import CustomModal from '../../includes/CustomModal';
import CinemaForm from './CinemaForm';
import {SubmitContext} from '../../../contexts/submit.Context';
import {GetOrDelete, PostOrPut, ERROR_CODES} from '../../../api';

const ButtonActionFormatter = ({ row }) => {
  const [messageJSX, setMessage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelModal, setIsOpenDelModal] = useState(false);

  const { setIsSubmit } = useContext(SubmitContext);

  const iconJSX = useMemo(() => <span className="modal__title mdi mdi-file-edit-outline"></span>, []);

  const onSubmitting = useCallback(
    (errors) => {
      const id = row["id"];
      const updateRecord = async (valuesObject) => {
        const access_token = sessionStorage.getItem("access_token");

        const respone = await PostOrPut(`cinemas/${id}`, "PUT", valuesObject, {
          Authorization: `Bearer ${access_token}`,
        });
        return respone;
      }
      
      const form = document.forms["cinema_update_form"];
  
      console.log(errors);
      // close -> error x --> success ==> oke
      
      if(errors && Object.keys(errors).length === 0) {
  
        const valuesObject = {
          // id: form["elements"]["id"].value,
          name: form["elements"]["name"].value,
          type: form["elements"]["type"].value,
          width: form["elements"]["width"].value,
          height: form["elements"]["height"].value,
          cinemaComplexId: form["elements"]["cinema_complex_id"].value,
        };
    
        updateRecord(valuesObject).then((response) => {
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
            alert(`Update record successfully!!!!`);
            console.log(response);
            setIsOpen(false);
            setIsSubmit(isSubmit => !isSubmit);
          }
        }).catch(console.error);
        
      }
    },
    [row,setIsSubmit],
  ); 

  useEffect(() => {
    const newMessageJSX = <CinemaForm values={row} iconSummit={iconJSX} onSubmitting={onSubmitting} action="update" />;
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
      const respone = await GetOrDelete(`cinemas/${id}`, "DELETE", {
        Authorization: `Bearer ${access_token}`,
      });
      return respone;
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
        alert("delete record successfully!");
        console.log(response);
        setIsOpenDelModal(false);
        setIsSubmit(isSubmit => !isSubmit);
      }
    }).catch(console.error);
  }

  return (
    <div className="button_group d-flex align-items-center justify-content-center w-100">
      <div className="d-none">{row["name"]}</div>
      <Button color="warning" onClick={() => handleClick("update")}>
        <span className="mdi mdi-file-edit-outline"></span>
      </Button>
      <CustomModal 
        title={`update record ${row["name"]}`}
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
        title={`delete record ${row["name"]} ?`}
        message={`Do you really wish to delete this record (${row["name"]})? Becarefull that we won't take resposibilty anything about this record !!`}
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