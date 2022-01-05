import { fireStoreIris } from "baseiris";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const sendFiles = (files, nomCollection) => {
  files.forEach((doc) => {
    sendDoc(doc, nomCollection);
  });
};

const sendDoc = (file, nomCollection) => {
  fireStoreIris
    .addToCollection(nomCollection, { document: file }, file.id)
    .then((e) => {
      console.log("document is added to the collection");
      console.log(e);
    })
    .catch((err) => {
      console.log("Document non enrégistré" + err);
    });
};

const removeDoc = (path) => {
  fireStoreIris
    .removeDoc(path)
    .then(() => {
      console.log("document is deleted");
    })
    .catch((err) => {
      console.log("Document non supprimé" + err);
    });
};

const LinkFile = ({ item, nom, nomCollection }) => {
  const [doc, setdoc] = useState();

  useEffect(() => {
    fireStoreIris
      .get(nomCollection + "/" + item)
      .then((data) => {
        console.log("Le document dans getFile");
        console.log(data.document.file);
        setdoc(data.document.file);
      })
      .catch((err) => {
        console.log("erreur de recuperation du document " + err);
        throw err;
      });
  }, []);

  const openFile = () => {
    var win = window.open();
    win.document.write(
      '<iframe src="' +
        doc +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
    );
  };

  return (
    <span onClick={openFile}>
      <a> {nom}</a>
    </span>
  );
};

export { sendFiles };

export { removeDoc };
export default LinkFile;

LinkFile.propTypes = {
  nom: PropTypes.string,
  item: PropTypes.object,
  nomCollection: PropTypes.string,
  deleteFile: PropTypes.func,
};
