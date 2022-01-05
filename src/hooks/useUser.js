const { default: baseIris } = require("baseiris");
const { useEffect, useState } = require("react");

const useUser = (id) => {
  const [client, setClient] = useState({});

  useEffect(() => {
    (async () => {
      const utilisateur = await baseIris.fetch(`/${id}`, {});
      const myclient = utilisateur.client;
      setClient({ ...client, ...myclient });
    })();
  }, []);

  return client;
};

export default useUser;
