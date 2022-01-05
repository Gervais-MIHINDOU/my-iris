import PropTypes from "prop-types";
import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const UploadFile = ({ upload }) => {
  const filesFromFileStore = useRef([]);

  const filesFromDatabase = useRef({});

  const handleChange = (event) => {
    event.preventDefault();
    const filesUpload = event.target.files;

    Object.keys(filesUpload).map((key) => {
      const file = filesUpload[key];
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
      }

      reader.onload = (readerEvent) => {
        const id = uuidv4();
        const nom = file.name;

        /*** Fichier à destination de la Database */
        const fileFromDatabase = {
          nom: nom,
          id: id,
        };
        filesFromDatabase.current[id] = fileFromDatabase;

        /*** Fichier à destination de FileStore */
        const fileFromFileStore = {
          nom: nom,
          id: id,
          file: readerEvent.target.result,
        };
        filesFromFileStore.current.push(fileFromFileStore);
      };
    });
    upload(filesFromDatabase.current, filesFromFileStore.current);
  };

  return (
    <input
      id="contained-button-file"
      type="file"
      onChange={handleChange}
      multiple
      required
    />
  );
};

export default UploadFile;

UploadFile.propTypes = {
  upload: PropTypes.func,
};
