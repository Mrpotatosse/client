import type {User} from "oidc-client-ts";

export type AuthState = {
  user?: User | null,
  keycloak?: KeycloakToken,
  _eventsBound: boolean,
}

export interface KeycloakToken {
  sub: string;
  preferred_username: string;
  email?: string;
  realm_access?: {
    roles: string[];
  };
  resource_access?: {
    [clientId: string]: {
      roles: string[];
    };
  };
  exp: number;
}
