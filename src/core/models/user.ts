import {Organization} from './organization';
import { ViewPermissions } from './view-permissions';

export class User {
  firstName = '';
  lastName = '';
  organization: Organization = null;
  viewPermissions: ViewPermissions = new ViewPermissions();
  organizationLegalName = '';
}
