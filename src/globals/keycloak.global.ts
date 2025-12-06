import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: "https://auth.tifoon.fr",
  realm: "tifoon",
  clientId: "tifoon-client"
});
