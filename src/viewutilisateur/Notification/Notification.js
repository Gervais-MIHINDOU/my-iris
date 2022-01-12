// @material-ui/core components
import { NotificationImportant } from "@material-ui/icons";
import baseIris from "baseiris";
import CustomTabs from "components/CustomTabs/CustomTabs";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import Tasks from "components/Tasks/Tasks";
import { UserContext } from "context/userContextProvider";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import Swal from "sweetalert2";

const Notification = () => {
  const { client, setClient, admin, setAdmin, isAdmin } = useContext(
    UserContext
  );

  const getNotifs = () => {
    const user = isAdmin ? admin : client;

    return user?.notifications?.map((notif) => {
      return {
        val1: notif.id,
        val2: notif.Object,
        val3: notif.Severite.toUpperCase(),
        val4: notif.Date,
        val5: notif.Provenance,
        val6: notif.isNew,
      };
    })?.reverse();
  };

  const detailAdmin = (id, event) => {
    event.preventDefault();
    const notification = admin?.notifications?.filter(
      (notif) => notif.id === id
    )[0];

    Swal.fire({
      title: "<strong>" + notification.Object + "</strong>",
      icon:
        notification.Severite === "urgent" ? "error" : notification.Severite,
      html:
        "<b>Date de notification :</b> " +
        notification.Date +
        "<br /><br />" +
        "<b>Provenance:</b> " +
        notification.Provenance +
        "<br /><br />" +
        "<b>Message :</b> " +
        notification.message,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK',
      cancelButtonAriaLabel: "Thumbs down",
    });

    notification["isNew"] = false;
    baseIris.post(`/${admin.id}/client`, { data: admin });
    setAdmin({ ...admin });
  };

  const detail = (id, event) => {
    event.preventDefault();
    const notification = client?.notifications?.filter(
      (notif) => notif.id === id
    )[0];

    Swal.fire({
      title: "<strong>" + notification.Object + "</strong>",
      icon:
        notification.Severite === "urgent" ? "error" : notification.Severite,
      html:
        "<b>Date de notification :</b> " +
        notification.Date +
        "<br /><br />" +
        "<b>Provenance:</b> " +
        notification.Provenance +
        "<br /><br />" +
        "<b>Message :</b> " +
        notification.message,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK',
      cancelButtonAriaLabel: "Thumbs down",
    });

    notification["isNew"] = false;
    baseIris.post(`/${client.id}/client`, { data: client });
    setClient({ ...client });
  };
  const NotifsList = () => {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title=""
            isNotif={true}
            headerColor="primary"
            tabs={[
              {
                tabName: "Mes Notifications",
                tabIcon: NotificationImportant,
                tabContent: (
                  <Tasks
                    tableHead={["Object", "Severité", "Date", "Provenance"]}
                    tasks={
                      getNotifs() && getNotifs().length > 0 ? getNotifs() : []
                    }
                    detail={isAdmin ? detailAdmin : detail}
                    isAdmin={false}
                    isNotif={true}
                  />
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    );
  };
  return <NotifsList />;
};
export default Notification;
Notification.propTypes = {
  client: PropTypes.object,
};
