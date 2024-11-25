// hooks/useGoogleInit.js
import { useEffect } from "react";
import { gapi } from "gapi-script";

export const useGoogleInit = (clientId) => {
  useEffect(() => {
    function start() {
      gapi.client.init({ clientId, scope: "" });
    }
    gapi.load("client:auth2", start);
  }, [clientId]);
};

