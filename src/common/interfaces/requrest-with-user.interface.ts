import { Request } from 'express';
import { KeycloakUserFromToken } from '../classes/keycloak-user.class';

export interface IRequestWithUser extends Request {
  user: KeycloakUserFromToken;
}
