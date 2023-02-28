import React, {useEffect, useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

function CustomDropzone({action, onChange}) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    onChange( acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        // buffer:  Buffer.from( new Uint8Array(binaryStr) ),
      })
    ));
  
    setFiles( acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        //buffer:  Buffer.from( new Uint8Array(binaryStr) ),
      })
    ));
    
  }, [onChange]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpg, image/jpeg, image/png',
    onDrop,
  });
  
  useEffect(() => () => {

    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (index, e)  =>{
    e.preventDefault();
    onChange(files.filter((val, i) => i !== index));
    setFiles(files.filter((val, i) => i !== index));
  }

  return (
    <div className="dropzone">
      <div className={`dropzone dropzone--single`}>
        <div {...getRootProps()} className="dropzone__input">
          {(!files || files.length === 0)
          && (
          <div className="dropzone__drop-here">
            <span className="lnr lnr-upload" /> Drop file here to upload
          </div>
          )}
          <input name={`${action}_upload_file`} id={`${action}_upload_file`} {...getInputProps()} />
        </div>
        {files && Array.isArray(files) && files.length > 0
        && (
        <aside className="dropzone__img">
          <img src={files[0].preview} alt="drop-img" />
          <p className="dropzone__img-name">{files[0].name}</p>
          <button className="dropzone__img-delete" type="button" onClick={e => removeFile(0, e)}>
            Remove
          </button>
        </aside>
        )}
      </div>
    </div>
  );
}

export default CustomDropzone;