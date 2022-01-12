import EnumObjectNotif from "viewutilisateur/Notification/EnumObjectNotif";
import { v4 as uuidv4 } from "uuid";
import baseIris from "baseiris";
import { SenderEmail } from "SenderMail";

const addNotifAdmin = (admin, status, nom) => {
  if (!admin?.notifications) {
    admin["notifications"] = [];
  }

  const message =  "Le dossier du client " +
  nom +
  " a évolué, Votre validation est attendu d'urgence. Le status du dossier est : " +
  status +
  ". Merci de ne pas faire trop attendre le client";

  admin["notifications"].push({
    id: uuidv4(),
    Object: "URGENT",
    Severite: EnumObjectNotif.WARNING,
    Date: new Date().toISOString().split("T")[0],
    Provenance: "MY IRIS",
    isNew: true,
    message: message,
  });

  baseIris.update(`/${admin.id}/client`, { data: admin });
  SenderEmail(admin.email,message,nom);
};

const notifAdminEvolutiondossier = (status, nom) => {
  baseIris.fetch(`/`, {}).then((response) => {
    Object.keys(response)
      .filter((id) => response[id]?.client?.isAdmin)
      .map((id) => addNotifAdmin(response[id]?.client, status, nom));
  });
};

const notifClientEvolutiondossier = (client, status) => {
  if (!client?.notifications) {
    client["notifications"] = [];
  }
  const message = "Votre Dossier a évolué,Il a été validé par My IRIS il est maintenant à l'étape " +
  status +
  "\nVeuillez poursuivre les prochaines étapes pour l'évolution de votre dossier";

  client["notifications"].push({
    id: uuidv4(),
    Object: "Bonne nouvelle",
    Severite: EnumObjectNotif.SUCESS,
    Date: new Date().toISOString().split("T")[0],
    Provenance: "MY IRIS",
    isNew: true,
    message: message,
  });
  SenderEmail(client.email,message,client.nom);
  return client;
};

export { notifClientEvolutiondossier, notifAdminEvolutiondossier };
