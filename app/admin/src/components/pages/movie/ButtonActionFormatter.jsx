import React, {useState, useEffect, useMemo, useContext, useCallback} from 'react';
import { Button } from 'reactstrap';

import CustomModal from '../../includes/CustomModal';
import MovieForm from './MovieForm';
import {SubmitContext} from '../../../contexts/submit.Context';
// import VALIDATE_TYPE from './validate';
import {GetOrDelete ,BASE_API, ERROR_CODES} from '../../../api';

const ButtonActionFormatter = ({ row }) => {
  const [messageJSX, setMessage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelModal, setIsOpenDelModal] = useState(false);

  const { setIsSubmit } = useContext(SubmitContext);

  const iconJSX = useMemo(() => <span className="modal__title mdi mdi-file-edit-outline"></span>, []);

  const onSubmitting = useCallback(
    (errors) => {
      const id = row["id"];
      const updateMovieAPi = (valuesObject) => {
        const access_token = sessionStorage.getItem("access_token");

        const formData = new FormData();
        if(valuesObject.file)
          formData.append("file", valuesObject.file);
        formData.append("name", valuesObject.name);
        formData.append("publishDate", valuesObject.publishDate);
        formData.append("trailer", valuesObject.trailer);
        formData.append("duration", valuesObject.duration);
  
        fetch(`${BASE_API}/movies/${id}`, {
          mode: 'cors',
          // cache: 'no-cache',
          // credentials: 'same-origin',
          // redirect: 'follow',
          // referrerPolicy: 'no-referrer',
          headers: {
            'Authorization': `Bearer ${access_token}`
          },
          method: "PUT",
          body: formData,
        }).then((res) => {
          // console.log('update response', res);
          return res.json();
        }).then(json => {
<<<<<<< HEAD
          // console.log(valuesObject);
=======
>>>>>>> 182db25 (fix managerment movie & screening)
          if(ERROR_CODES.includes(json.statusCode)) {

            if(json.statusCode === "403") {
              window.location.href = "/403"
            }
            else {
              window.location.href = "/505";
            }
          }
          else {
<<<<<<< HEAD
            alert("Add new record successfully!");
=======
            console.log(json);
            alert("Upđate new record successfully!");
>>>>>>> 182db25 (fix managerment movie & screening)
            setIsOpen(false);
            setIsSubmit(isSubmit => !isSubmit);
            setPageIndex(1);
          }
        }).catch(console.error);
      }

      const form = document.forms["movie_update_form"];
  
      console.log(errors);
      // close -> error x --> success ==> oke
      
      if(errors && Object.keys(errors).length === 0) {
  
        const valuesObject = {
          // id:  form["elements"]["id"].value,
          name:  form["elements"]["name"].value,
          publishDate:  form["elements"]["publishDate"].value,
          file: form["elements"]["update_upload_file"].files[0],
          trailer:  form["elements"]["trailer"].value,
          duration:  form["elements"]["duration"].value,
        };

        updateMovieAPi(valuesObject);
      }
    },
<<<<<<< HEAD
    [row,setIsSubmit],
=======
    [row,setIsSubmit, history, setPageIndex],
>>>>>>> 182db25 (fix managerment movie & screening)
  ); 

  useEffect(() => {
    const newMessageJSX = <MovieForm values={row} iconSummit={iconJSX} onSubmitting={onSubmitting} action="update" />;
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
    const delMovieAPi = async () => {
      const access_token = sessionStorage.getItem("access_token");
      const response = await GetOrDelete(`movies/${id}`, "DELETE", {
        Authorization: `Bearer ${access_token}`,
      });
      return response;
    }
    delMovieAPi().then((response) => {
      if(ERROR_CODES.includes(response.statusCode)) {
        alert(response.message);
      }
      else {
        alert("Delete record successfully!");
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
        message={`Do you really wish to delete this record(${row["name"]})? Becarefull that we won't take resposibilty anything about this record !!`}
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