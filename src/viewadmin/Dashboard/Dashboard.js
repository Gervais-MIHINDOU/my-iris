// @material-ui/core
import { useMediaQuery, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PermIdentity, Policy } from "@material-ui/icons";
import Accessibility from "@material-ui/icons/Accessibility";
import AccessTime from "@material-ui/icons/AccessTime";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Person from "@material-ui/icons/Person";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import baseIris from "baseiris";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import Tasks from "components/Tasks/Tasks.js";
import { UserContext } from "context/userContextProvider";
import React, { useContext, useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import Swal from "sweetalert2";
import {
  completedTasksChart,
  dailySalesChart,
  emailsSubscriptionChart,
} from "variables/charts.js";
import Calendrier from "./Calendrier";

const useStyles = makeStyles(styles);
const Dashboard = () => {
  const theme = useTheme();
  const matchesNotSm = useMediaQuery(theme.breakpoints.up("sm"));

  const { admin } = useContext(UserContext);
  const [mombreClientTotal, setNombreClientTotal] = useState(0);
  const [nombreUtilisateurs, setNombreUtilisateurs] = useState(0);
  const [nombreAdmin, setNombreAdmin] = useState(0);
  const [userOfThisYears, setUserOfThisYears] = useState(0);
  const [userOfThisMonth, setUserOfThisMonth] = useState();
  const [amountUnit, setAmountUnit] = useState(0);
  const [responseData, setResponseData] = useState({});

  const [searchValue, setSearchValue] = useState();
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

  const getAllAdmins = () => {
    return Object.keys(responseData)
      .filter(
        (id) =>
          responseData[id].client.isAdmin && filtre(responseData[id]?.client)
      )
      .map((id) => {
        return {
          val1: id,
          val2: responseData[id].client.nom,
          val3: responseData[id].client.email,
          val4: responseData[id].client.dateInscription,
          val5: responseData[id].client.lastdateActif,
          phone: responseData[id].client.phone,
          isActif: responseData[id].client.isActif,
          nbreAction: responseData[id].client.nbreAction,
        };
      });
  };

  const nbreClientAyantPayeCetteAnnee = () => {
    return Object.keys(responseData).filter(
      (id) =>
        !responseData[id].client.isAdmin &&
        responseData[id].client.payementOk &&
        new Date(new Date().getFullYear(), 0, 1).getTime() <
          new Date(responseData[id].client.dateInscription).getTime()
    ).length;
  };

  const nbreClientNayantpaspaye = () => {
    return Object.keys(responseData).filter(
      (id) =>
        !responseData[id].client.isAdmin && !responseData[id].client.payementOk
    ).length;
  };

  const nbreClientTotal = () => {
    return Object.keys(responseData).filter(
      (id) => !responseData[id].client.isAdmin
    ).length;
  };

  const nbreClientOfThisMonth = () => {
    return Object.keys(responseData).filter(
      (id) =>
        !responseData[id].client.isAdmin &&
        new Date(new Date().getFullYear(), new Date().getMonth(), 0).getTime() <
          new Date(responseData[id].client.dateInscription).getTime() &&
        new Date(responseData[id].client.dateInscription).getTime() <
          new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          ).getTime()
    ).length;
  };

  const nbreClientOfLastyearforThisMonth = () => {
    return Object.keys(responseData).filter(
      (id) =>
        !responseData[id].client.isAdmin &&
        new Date(
          new Date().getFullYear() - 1,
          new Date().getMonth(),
          0
        ).getTime() <
          new Date(responseData[id].client.dateInscription).getTime() &&
        new Date(responseData[id].client.dateInscription).getTime() <
          new Date(
            new Date().getFullYear() - 1,
            new Date().getMonth() + 1,
            0
          ).getTime()
    ).length;
  };

  const nbreClientByMonthDejaPaye = (response, nbreAnneeMoins, month) => {
    return Object.keys(response).filter(
      (id) =>
        !response[id].client.isAdmin &&
        response[id].client.payementOk &&
        new Date(
          new Date().getFullYear() - nbreAnneeMoins,
          month,
          0
        ).getTime() < new Date(response[id].client.dateInscription).getTime() &&
        new Date(response[id].client.dateInscription).getTime() <
          new Date(
            new Date().getFullYear() - nbreAnneeMoins,
            month + 1,
            0
          ).getTime()
    ).length;
  };

  const nbreClientByMonth = (response, nbreAnneeMoins, month) => {
    return Object.keys(response).filter(
      (id) =>
        !response[id].client.isAdmin &&
        new Date(
          new Date().getFullYear() - nbreAnneeMoins,
          month,
          0
        ).getTime() < new Date(response[id].client.dateInscription).getTime() &&
        new Date(response[id].client.dateInscription).getTime() <
          new Date(
            new Date().getFullYear() - nbreAnneeMoins,
            month + 1,
            0
          ).getTime()
    ).length;
  };

  const nbreClientNayantPaspayeByMonth = (response, nbreAnneeMoins, month) => {
    return Object.keys(response).filter(
      (id) =>
        !response[id].client.isAdmin &&
        !response[id].client.payementOk &&
        new Date(
          new Date().getFullYear() - nbreAnneeMoins,
          month,
          0
        ).getTime() < new Date(response[id].client.dateInscription).getTime() &&
        new Date(response[id].client.dateInscription).getTime() <
          new Date(
            new Date().getFullYear() - nbreAnneeMoins,
            month + 1,
            0
          ).getTime()
    ).length;
  };

  const dataNbreClients = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    series: [
      [
        nbreClientByMonth(responseData, 1, Calendrier.JAN),
        nbreClientByMonth(responseData, 1, Calendrier.FEV),
        nbreClientByMonth(responseData, 1, Calendrier.MAR),
        nbreClientByMonth(responseData, 1, Calendrier.AVR),
        nbreClientByMonth(responseData, 1, Calendrier.MAI),
        nbreClientByMonth(responseData, 1, Calendrier.JUI),
        nbreClientByMonth(responseData, 1, Calendrier.JUL),
        nbreClientByMonth(responseData, 1, Calendrier.AOU),
        nbreClientByMonth(responseData, 1, Calendrier.SEP),
        nbreClientByMonth(responseData, 1, Calendrier.OCT),
        nbreClientByMonth(responseData, 1, Calendrier.NOV),
        nbreClientByMonth(responseData, 1, Calendrier.DEC),
      ],
      [
        nbreClientByMonth(responseData, 0, Calendrier.JAN),
        nbreClientByMonth(responseData, 0, Calendrier.FEV),
        nbreClientByMonth(responseData, 0, Calendrier.MAR),
        nbreClientByMonth(responseData, 0, Calendrier.AVR),
        nbreClientByMonth(responseData, 0, Calendrier.MAI),
        nbreClientByMonth(responseData, 0, Calendrier.JUI),
        nbreClientByMonth(responseData, 0, Calendrier.JUL),
        nbreClientByMonth(responseData, 0, Calendrier.AOU),
        nbreClientByMonth(responseData, 0, Calendrier.SEP),
        nbreClientByMonth(responseData, 0, Calendrier.OCT),
        nbreClientByMonth(responseData, 0, Calendrier.NOV),
        nbreClientByMonth(responseData, 0, Calendrier.DEC),
      ],
    ],
  };

  const dataNbreClientsNayantPasPaye = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    series: [
      [
        nbreClientNayantPaspayeByMonth(responseData, 1, Calendrier.JAN),
        nbreClientNayantPaspayeByMonth(responseData, 1, Calendrier.FEV),
        nbreClientNayantPaspayeByMonth(responseData, 1, Calendrier.MAR),
        nbreClientNayantPaspayeByMonth(responseData, 1, Calendrier.AVR),
        nbreClientNayantPaspayeByMonth(responseData, 1, Calendrier.MAI),
        nbreClientNayantPaspayeByMonth(responseData, 1, Calendrier.JUI),
        nbreClientNayantPaspayeByMonth(responseData, 1, Calendrier.JUL),
        nbreClientNayantPaspayeByMonth(responseData, 1, Calendrier.AOU),
        nbreClientNayantPaspayeByMonth(responseData, 1, Calendrier.SEP),
        nbreClientNayantPaspayeByMonth(responseData, 1, Calendrier.OCT),
        nbreClientNayantPaspayeByMonth(responseData, 1, Calendrier.NOV),
        nbreClientNayantPaspayeByMonth(responseData, 1, Calendrier.DEC),
      ],
      [
        nbreClientNayantPaspayeByMonth(responseData, 0, Calendrier.JAN),
        nbreClientNayantPaspayeByMonth(responseData, 0, Calendrier.FEV),
        nbreClientNayantPaspayeByMonth(responseData, 0, Calendrier.MAR),
        nbreClientNayantPaspayeByMonth(responseData, 0, Calendrier.AVR),
        nbreClientNayantPaspayeByMonth(responseData, 0, Calendrier.MAI),
        nbreClientNayantPaspayeByMonth(responseData, 0, Calendrier.JUI),
        nbreClientNayantPaspayeByMonth(responseData, 0, Calendrier.JUL),
        nbreClientNayantPaspayeByMonth(responseData, 0, Calendrier.AOU),
        nbreClientNayantPaspayeByMonth(responseData, 0, Calendrier.SEP),
        nbreClientNayantPaspayeByMonth(responseData, 0, Calendrier.OCT),
        nbreClientNayantPaspayeByMonth(responseData, 0, Calendrier.NOV),
        nbreClientNayantPaspayeByMonth(responseData, 0, Calendrier.DEC),
      ],
    ],
  };

  const dataMontantPerçu = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    series: [
      [
        nbreClientByMonthDejaPaye(responseData, 0, Calendrier.JAN) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 0, Calendrier.FEV) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 0, Calendrier.MAR) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 0, Calendrier.AVR) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 0, Calendrier.MAI) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 0, Calendrier.JUI) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 0, Calendrier.JUL) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 0, Calendrier.AOU) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 0, Calendrier.SEP) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 0, Calendrier.OCT) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 0, Calendrier.NOV) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 0, Calendrier.DEC) * amountUnit,
      ],
      [
        nbreClientByMonthDejaPaye(responseData, 1, Calendrier.JAN) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 1, Calendrier.FEV) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 1, Calendrier.MAR) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 1, Calendrier.AVR) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 1, Calendrier.MAI) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 1, Calendrier.JUI) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 1, Calendrier.JUL) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 1, Calendrier.AOU) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 1, Calendrier.SEP) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 1, Calendrier.OCT) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 1, Calendrier.NOV) * amountUnit,
        nbreClientByMonthDejaPaye(responseData, 1, Calendrier.DEC) * amountUnit,
      ],
    ],
  };
  const pourcentage = (valA, valB) => {
    if (valB === 0) {
      return 100;
    }
    return (valA / valB - 1) * 100;
  };

  useEffect(() => {
    baseIris.fetch(`/`, {}).then((response) => {
      setResponseData({ ...responseData, ...response });
      setAmountUnit(
        admin?.montantUnitairePrestation ? admin.montantUnitairePrestation : 150
      );
      setNombreUtilisateurs(Object.keys(response).length);
      setNombreClientTotal(
        Object.keys(response).filter((id) => !response[id].client.isAdmin)
          .length
      );
      setNombreAdmin(
        Object.keys(response).filter((id) => response[id].client.isAdmin).length
      );

      setUserOfThisYears(
        Object.keys(response).filter(
          (id) =>
            !response[id].client.isAdmin &&
            new Date(new Date().getFullYear(), 0, 1).getTime() <
              new Date(response[id].client.dateInscription).getTime()
        ).length
      );
      setUserOfThisMonth(
        Object.keys(response).filter(
          (id) =>
            !response[id].client.isAdmin &&
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              0
            ).getTime() <
              new Date(response[id].client.dateInscription).getTime() &&
            new Date(response[id].client.dateInscription).getTime() <
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                0
              ).getTime()
        ).length
      );
      return response;
    });
  }, []);

  const classes = useStyles();

  const modifierAdmin = async (id, event) => {
    event.preventDefault();
    const user = responseData[id];
    const { value: formValues } = await Swal.fire({
      title: "Modifier profil \n Admin\n " + user.client.nom,
      showCancelButton: true,
      cancelButtonText: "annuler",
      html:
        '<input placeholder ="nom" id="swal-input1" class="swal2-input">' +
        '<input placeholder ="Telephone" id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      const nom = formValues[0];
      const phone = formValues[1];
      if (nom) {
        user.client["nom"] = nom;
      }

      if (phone) {
        user.client["phone"] = phone;
      }

      if (phone || nom) {
        baseIris.post(`/${id}/client`, { data: user.client });
        Swal.fire(
          "Modification effectuée",

          "",

          "success"
        );

        const responseDataCopy = { ...responseData };
        responseDataCopy[id] = user;
        setResponseData(responseDataCopy);
      } else {
        Swal.fire(
          "Vous devez saisir au moins une donnée",

          "",

          "error"
        );
      }
    }
  };
  const supprimerAdmin = (id, event) => {
    event.preventDefault();
    const client = responseData[id].client;
    Swal.fire({
      title: "Etes vous sur ?",
      text: "Vous etes sur le point de supprimer l' Admin  " + client.nom,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui, je supprime cet admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        baseIris.post(`/${client.id}/client`, { data: null });
        const responseDataCopy = { ...responseData };
        delete responseDataCopy[id];
        setResponseData(responseDataCopy);
        Swal.fire("Admin supprimé!", "Cette admin a été supprimé.", "success");
      }
    });
  };

  const isActif = (value) => {
    if (value) {
      return "OUI";
    } else {
      return "NON => Absent ou pas assez actif";
    }
  };

  const detailAdmin = (id, event) => {
    event.preventDefault();
    const user = responseData[id];
    const client = user.client;
    Swal.fire({
      title: "<strong>Detail Admin</strong>",
      icon: "info",
      html:
        "<b>Nom :</b> " +
        client.nom +
        "<br /><br />" +
        "<b>Prenom :</b> " +
        client.prenom +
        "<br /><br />" +
        "<b>Email :</b> " +
        client.email +
        "<br /><br />" +
        "<b>Telephone:</b> " +
        client.phone +
        "<br /><br />" +
        "<b>date d'inscription :</b> " +
        client.dateInscription +
        "<br /><br />" +
        "<b>dernière date actif:</b> " +
        client.lastdateActif +
        "<br /><br />" +
        "<b>L'admin est il performant ? :</b> " +
        isActif(client.isActif) +
        "<br />",
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK',
      cancelButtonAriaLabel: "Thumbs down",
    });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Person />
              </CardIcon>
              <p className={classes.cardCategory}>Utilisateurs</p>
              <h3 className={classes.cardTitle}>{nombreUtilisateurs}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <span>
                  {
                    "Nombre d'uilisateurs inscrit sur l'application (clients + admins)"
                  }
                </span>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <PermIdentity />
              </CardIcon>
              <p className={classes.cardCategory}>Clients</p>
              <h3 className={classes.cardTitle}>{mombreClientTotal}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <span>
                  {"Uniquement le nombre de clients inscrit sur l'application"}
                </span>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Policy />
              </CardIcon>
              <p className={classes.cardCategory}>Admins</p>
              <h3 className={classes.cardTitle}>{nombreAdmin}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <span>
                  {"Le nombre d'administrateur présent sur l'application"}
                </span>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Nouveau client</p>
              <br />
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <span>
                  <h6 className={classes.cardTitle}>
                    {"+" + userOfThisYears} cette année
                  </h6>
                  <br />
                  <h6 className={classes.cardTitle}>
                    {"+" + userOfThisMonth} ce mois
                  </h6>
                </span>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dataNbreClients}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                Comparatif nombre de clients
              </h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} />
                  {pourcentage(
                    nbreClientOfThisMonth(),
                    nbreClientOfLastyearforThisMonth()
                  )}
                  %
                </span>
                {" augmentation clients"}
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime />
                {
                  "comparaison entre le mois de cette année et le mois de l'année passé"
                }
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={dataNbreClientsNayantPasPaye}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                {"Clients N'ayant pas encore reglé"}
              </h4>
              <p className={classes.cardCategory}>
                {nbreClientTotal() !== 0
                  ? (nbreClientNayantpaspaye() / nbreClientTotal()) * 100
                  : 0}
                % {" d'augmentation des dus non reglés"}
              </p>
              <p className={classes.cardCategory}>
                {nbreClientNayantpaspaye() +
                  " client(s) n'ont(a) pas encore reglé "}
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime />
                {
                  "comparaison entre les clients ayant déja regler et les clienst n'ayant pas encore reglé"
                }
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={dataMontantPerçu}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Les montants perçu</h4>
              <p className={classes.cardCategory}>
                {nbreClientAyantPayeCetteAnnee() * amountUnit} euro cette année
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Total des montants perçu cette année
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title=""
            headerColor="primary"
            setSearchValue={setSearchValue}
            tabs={[
              {
                tabName: "Admins",
                tabIcon: Policy,
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
                    tasks={getAllAdmins()}
                    modifier={modifierAdmin}
                    supprimer={supprimerAdmin}
                    detail={detailAdmin}
                    isAdmin={true}
                  />
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Dashboard;
