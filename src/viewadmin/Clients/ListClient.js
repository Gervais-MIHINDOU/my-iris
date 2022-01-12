// @material-ui/core components
import { useMediaQuery, useTheme } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import baseIris from "baseiris";
import CustomTabs from "components/CustomTabs/CustomTabs";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import Tasks from "components/Tasks/Tasks";
import { UserContext } from "context/userContextProvider";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

const ListClient = () => {

  const theme = useTheme();
  const matchesNotSm = useMediaQuery(theme.breakpoints.up("sm"));

  const [searchValue, setSearchValue] = useState();
  const { client, setClient } = useContext(UserContext);
  const [id, setId] = useState();

  const [responseData, setResponseData] = useState({});

  const modifier = async (id, event) => {
    event.preventDefault();
    const client = responseData[id].client;

    Swal.fire({
      title: "Etes vous sur de cette élévation?",
      text:
        "Vous etes sur le point de transformer en admin l'utilisateur " +
        client.nom,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, je valide cette promotion!",
    }).then((result) => {
      if (result.isConfirmed) {
        client["isAdmin"] = true;
        baseIris.post(`/${id}/client`, {
          data: client,
        });

        const responseDataCopy = { ...responseData };
        responseDataCopy[id]["client"] = client;
        setResponseData(responseDataCopy);

        Swal.fire(
          "Passage de Client à Admin Réussi !",
          "Ce client a bien été promus en admin.",
          "success"
        );
      }
    });
  };
  const supprimerClient = (id, event) => {
    event.preventDefault();
    const client = responseData[id].client;
    Swal.fire({
      title: "Etes vous sur ?",
      text: "Vous etes sur le point de supprimer le client " + client.nom,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, je supprime cet utilisateur!",
    }).then((result) => {
      if (result.isConfirmed) {
        baseIris.post(`/${client.id}/client`, { data: null });
        const responseDataCopy = { ...responseData };
        delete responseDataCopy[id];
        setResponseData(responseDataCopy);
        Swal.fire(
          "Client supprimé!",
          "Ce client a bien été supprimé.",
          "success"
        );
      }
    });
  };

  const [goToDetail, setGoToDetail] = useState();
  const detail = (id, event) => {
    event.preventDefault();
    setId(id);
    setGoToDetail(true);
  };
  useEffect(() => {
    baseIris.fetch(`/`, {}).then((response) => {
      setResponseData({ ...responseData, ...response });
      return response;
    });
  }, []);

  const filtre = (user) => {
    if (searchValue) {
      return (
        user?.nom === searchValue ||
        user?.email === searchValue ||
        user?.dateInscription === searchValue ||
        user?.lastdateActif === searchValue
      );
    } else {
      return true;
    }
  };

  const getAllClient = () => {
    return Object.keys(responseData)
      .filter(
        (id) =>
          !responseData[id]?.client?.isAdmin && filtre(responseData[id]?.client)
      )
      .map((id) => {
        console.log("/********** POUR ANALYSE ***************/");
        console.log(responseData[id]);
        console.log(responseData[id].client);
        return {
          val1: id,
          val2: responseData[id].client["nom"],
          val3: responseData[id].client["email"],
          val4: responseData[id].client["dateInscription"],
          val5: responseData[id].client["lastdateActif"],
        };
      });
  };

  if (goToDetail) {
    setClient({ ...client, ...responseData[id].client });
    return <Redirect push to={`/admin/client`} />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
          title=""
          headerColor="primary"
          setSearchValue={setSearchValue}
          tabs={[
            {
              tabName: "Nos Clients",
              tabIcon: Person,
              tabContent: (
                <Tasks
                  tableHead={matchesNotSm ? [
                    "nom",
                    "email",
                    "date d'inscription",
                    "dernière date actif",
                  ] : [
                    "nom",
                    "date d'inscription",
                    "dernière date actif",
                  ]}
                  tasks={getAllClient()}
                  modifier={modifier}
                  supprimer={supprimerClient}
                  detail={detail}
                  isAdmin={false}
                />
              ),
            },
          ]}
        />
      </GridItem>
    </GridContainer>
  );
};
export default ListClient;
