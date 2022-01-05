import baseIris from "baseiris";
import { useEffect, useState } from "react";

const useConfig = () => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    baseIris.fetch(`/`, {}).then((response) => {
      const conf = {};

      const admin = Object.keys(response)
        .filter((id) => response[id]?.client?.isAdmin)
        .map((id) => response[id]?.client)[0];
      console.log("L'admin de la config");
      console.log(admin);
      conf["numeroAdmin"] = admin?.numeroAdmin;
      conf["emailAdmin"] = admin?.emailAdmin;
      conf["montantUnitairePrestation"] = admin?.montantUnitairePrestation;
      setConfig({ ...config, ...conf });
      return response;
    });
  }, []);

  return config;
};

export default useConfig;
