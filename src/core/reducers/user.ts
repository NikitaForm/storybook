import * as actions from '../actions/user';
import * as models from '../models';

export interface State {
  user: models.User;
}

const user = new models.User();
user.firstName = 'Test';
user.lastName = 'Delta';

const organization = new models.Organization();
organization.id = 9;
user.organization = organization;
user.viewPermissions = new models.ViewPermissions();
user.viewPermissions.fulfillFlights = true;
user.viewPermissions.publishedFlights = true;
user.viewPermissions.privateFlightsFlexibility = true;
user.viewPermissions.publishedPrivateFlights = true;
user.viewPermissions.publishedSharedFlights = true;
user.viewPermissions.emailConfiguration = true;
user.organizationLegalName = 'Delta Private Jets, Inc.';

const initialState: State = {
  user: user
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload
      });

    default:
      return state;
  }
}

export const getUser = (state: State) => state.user;
export const getUserOrgLegalName = (state: State) => state.user.organizationLegalName;
export const getUserPermissions = (state: any) => state.user.viewPermissions;
export const getUserPermissionsFulfillFlights = (state: any) => {

  return state.user.viewPermissions.fulfillFlights;
};

export const getUserPermissionsPublishedFlights = (state: any) => {

  return state.user.viewPermissions.publishedFlights;
};
