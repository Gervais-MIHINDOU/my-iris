import baseIris from "baseiris";
import { useContext, useRef } from "react";
import Button from "components/CustomButtons/Button.js";
import { sendFiles } from "gestionFichier";
import { UserContext } from "context/userContextProvider";
import React from "react";
import UploadFile from "components/File/UploadFile";
import PropTypes from "prop-types";
import LinkFile from "gestionFichier";

const DocumentGarant = ({ nom }) => {
  const { client, setClient } = useContext(UserContext);
  const filesDataBase = useRef([]);

  const filesFireStore = useRef([]);

  const uploadFile = (fileDatabase, fileFileStore) => {
    filesDataBase.current = fileDatabase;
    filesFireStore.current = fileFileStore;
  };

  const listLinkFile = () => {
    if (client?.garant && client?.garant["garant_" + nom]) {
      const documents = client["garant"]["garant_" + nom];
      return Object.keys(documents).map((item) => {
        if (!documents[item]) {
          return "";
        }
        return (
          <li key={item}>
            <LinkFile
              item={item}
              nom={documents[item]?.nom}
              nomCollection={nom}
            />
          </li>
        );
      });
    } else {
      return <a>{"Pour l'instant il y'a aucun document"}</a>;
    }
  };

  const handleSubmit = () => {
    if (!client?.garant) {
      client["garant"] = {};
    }
    client["garant"]["garant_" + nom] = filesDataBase.current;
    baseIris.post(`/${client.id}/client`, { data: client });
    sendFiles(filesFireStore.current, "garant_" + nom);
    setClient({ ...client });
  };

  return (
    <div>
      <br />
      <UploadFile upload={uploadFile} />
      <br /> <br />
      <Button
        variant="contained"
        color="info"
        component="span"
        onClick={handleSubmit}
      >
        Valider
      </Button>
      <br /> <br />
      {listLinkFile()}
    </div>
  );
};
export default DocumentGarant;
DocumentGarant.propTypes = {
  nom: PropTypes.string,
};
