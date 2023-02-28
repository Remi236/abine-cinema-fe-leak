import React, {useState, useEffect, useMemo, useContext, useCallback} from 'react';
import { Button } from 'reactstrap';

import CustomModal from '../../includes/CustomModal';
import CinemaComplexForm from './CinemaComplexForm';
import {SubmitContext} from '../../../contexts/submit.Context';
import {GetOrDelete, PostOrPut, ERROR_CODES} from '../../../api';

const ButtonActionFormatter = ({ row }) => {
  const [messageJSX, setMessage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelModal, setIsOpenDelModal] = useState(false);

  const { isSubmit, setIsSubmit } = useContext(SubmitContext);

  const iconJSX = useMemo(() => <span className="modal__title mdi mdi-file-edit-outline"></span>, []);

  const onSubmitting = useCallback(
    (errors) => {
      const id = row["id"];
      const updateRecord = async (valuesObject) => {
        const access_token = sessionStorage.getItem("access_token");

        const respone = await PostOrPut(`cinema-complexes/${id}`, "PUT", valuesObject, {
          Authorization: `Bearer ${access_token}`,
        });
        return respone;
      }

      const form = document.forms["cinema_complex_update_form"];
  
      console.log(errors);
      // close -> error x --> success ==> oke
      
      if(errors && Object.keys(errors).length === 0) {

        const valuesObject = {
          // id: form["elements"]["id"].value,
          name: form["elements"]["name"].value,
          address: form["elements"]["address"].value,
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
            const newIsSubmit = !isSubmit;
            setIsSubmit(newIsSubmit);
          }
        }).catch(console.error);
      }
    },
    [isSubmit,setIsSubmit,row],
  ); 

  useEffect(() => {
    const newMessageJSX = <CinemaComplexForm values={row} iconSummit={iconJSX} onSubmitting={onSubmitting} action="update" />;
    setMessage(newMessageJSX);
  }, [row, iconJSX, onSubmitting]);

  const onClose = (type, isOke) => {
    switch (type) {
      case "update":
        setIsOpen(false);
        break;
      case "delete":
        setIsOpenDelModal(false);
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
      const respone = await GetOrDelete(`cinema-complexes/${id}`, "DELETE", {
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
        alert(`Delete record successfully!!!!`);
        console.log(response);
        setIsOpenDelModal(false);
        const newIsSubmit = !isSubmit;
        setIsSubmit(newIsSubmit);
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