import * as models from '../../domain/models';

import * as actions from '../actions/offer-list';
import * as viewModels from '../../view/view-models';
import * as _ from 'lodash';
import * as mappers from '../../services/offer/mappers';

export interface State {
  criteria: viewModels.OffersLookupCriteria;
  currentPage: number;
  isLoaded: boolean;
  isLoading: boolean;
  items: Array<models.OperatorPurchaseOffer>;
  itemsPerPage: number;
  itemsTotalCount: number;
  selectedPurchaseOffer: models.OperatorPurchaseOffer;
  isSelectedPurchaseOfferLoading: boolean;
  isSelectedPurchaseOfferLoaded: boolean;
  acceptOfferDialogVisible: boolean;
}
const rawOffers = [{
  'dba': 'JS',
  'offerPrice': '21250.0000',
  'operatorPrice': '21250.0000',
  'test': '2020-10-09T18:56:39.642',
  'flightPrice': '25000.00',
  'offerCount': 1,
  'aircraftCategory': {'aircraftCategoryId': 5, 'name': 'Mid Size Jet'},
  'operator': {'organizationId': 8, 'legalName': 'XOJet, Inc', 'name': 'XOJET', '_id': 'b9733070-7de2-435b-9054-b85efe88042f'},
  'automated': true,
  'createdDate': '2020-10-09T18:56:39.627',
  'sourcingRequestId': '6c3e2587-8364-4350-a05f-f5905f296dc7',
  'legs': [{
    'route': {'originAirport': {'code': 'KDAL'}, 'destinationAirport': {'code': 'KTEB'}},
    'departureDateUtc': '2020-10-16T19:56:00',
    'pax': 3,
    'departureDate': '2020-10-16T14:56:00',
    'departureTimeTbd': false
  }, {
    'route': {'originAirport': {'code': 'KTEB'}, 'destinationAirport': {'code': 'KDAL'}},
    'departureDateUtc': '2020-10-23T18:56:00',
    'pax': 3,
    'departureDate': '2020-10-23T14:56:00',
    'departureTimeTbd': false
  }],
  'operatorPurchaseOfferId': 'c19a0090-f501-4762-997e-2873bf2511e1',
  'expirationDateUTC': '2020-10-16T13:56:00',
  'commission': '3750.0000',
  '_id': 'c19a0090-f501-4762-997e-2873bf2511e1',
  'createdUser': {'firstName': 'Dan', 'lastName': 'Repik', 'upn': 'drepik@jetsmarter.com'},
  'serviceClassId': 1,
  'expirationDate': '2020-10-16T13:56:00',
  'status': {'name': 'Active', 'value': 1}
}, {
  'dba': 'JS',
  'offerPrice': null,
  'operatorPrice': null,
  'test': '2020-10-09T17:55:33.665',
  'flightPrice': '25000.00',
  'aircraftCategory': {'aircraftCategoryId': 5, 'name': 'Mid Size Jet'},
  'operator': {'organizationId': 8, 'legalName': 'XOJet, Inc', 'name': 'XOJET', '_id': 'b9733070-7de2-435b-9054-b85efe88042f'},
  'automated': true,
  'createdDate': '2020-10-09T17:55:33.649',
  'sourcingRequestId': 'de2b7566-b68f-486e-a2b5-d7b1819413da',
  'expirationDateUTC': new Date().setHours(new Date().getHours() + 6).toString(),
  'legs': [{
    'route': {'originAirport': {'code': 'KDAL'}, 'destinationAirport': {'code': 'KTEB'}},
    'departureDateUtc': '2020-10-16T18:55:00',
    'pax': 3,
    'departureDate': '2020-10-16T13:55:00',
    'departureTimeTbd': null
  }],
  'operatorPurchaseOfferId': 'b0bc45ef-de92-4b16-a9fc-2cae4a52990b',
  'commission': '3750.0000',
  '_id': 'b0bc45ef-de92-4b16-a9fc-2cae4a52990b',
  'createdUser': {'firstName': 'Dan', 'lastName': 'Repik', 'upn': 'drepik@jetsmarter.com'},
  'serviceClassId': 1,
  'expirationDate': new Date(Date.now() + 6 * 60 * 60 * 1000),
  'status': {'name': 'Active', 'value': 1},
  'openOffer': true,
  'offerSubmitted': false
}];
const mapperInstance = mappers.OfferMapper.Instance();
const items = rawOffers.map(mapperInstance.operatorPurchaseOfferDtoToOperatorPurchaseOffer.bind(mapperInstance));

const initialState: State = {
  criteria: new viewModels.OffersLookupCriteria(),
  currentPage: 1,
  isLoaded: false,
  isLoading: false,
  items: items as Array<models.OperatorPurchaseOffer>,
  itemsPerPage: 25,
  itemsTotalCount: 2,
  selectedPurchaseOffer: new models.OperatorPurchaseOffer(),
  isSelectedPurchaseOfferLoading: false,
  isSelectedPurchaseOfferLoaded: false,
  acceptOfferDialogVisible: false
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.RESET : {
      return {...initialState};
    }

    case actions.SEARCH: {
      return {
        ...state,
        criteria: _.cloneDeep(action.payload.criteria),
        isLoading: action.payload.isLoading === false ? action.payload.isLoading : true
      };
    }

    case actions.SEARCH_SUCCESS: {
      return {
        ...state,
        currentPage: action.payload.page,
        isLoaded: true,
        isLoading: false,
        items: action.payload.data,
        itemsTotalCount: action.payload.count
      };
    }

    case actions.SET_SELECTED_PURCHASE_OFFER: {
      return {
        ...state,
        selectedPurchaseOffer: _.cloneDeep(action.payload)
      };
    }

    case actions.GET_PURCHASE_OFFER: {
      return {
        ...state,
        isSelectedPurchaseOfferLoading: true,
      };
    }

    case actions.GET_PURCHASE_OFFER_SUCCESS: {
      return {
        ...state,
        isSelectedPurchaseOfferLoaded: true,
        isSelectedPurchaseOfferLoading: false
      };
    }

    case actions.GET_PURCHASE_OFFER_FAIL: {
      return {
        ...state,
        isSelectedPurchaseOfferLoaded: false,
        isSelectedPurchaseOfferLoading: false
      };
    }

    case actions.SET_ACCEPT_OFFER_DIALOG_VISIBLE: {
      return {
        ...state,
        acceptOfferDialogVisible: action.payload
      };
    }

    case actions.SUBMIT_PURCHASE_OFFER: {
      const clonedItems = _.cloneDeep(state.items);
      const selectedOffer = _.cloneDeep(state.selectedPurchaseOffer);
      selectedOffer.offerBid = action.payload.offerBid;
      selectedOffer.offerSubmitted = true;
      selectedOffer.aircraft = action.payload.aircraft;
      const updatedItems = clonedItems.map(item => {
        if (item.operatorPurchaseOfferId === selectedOffer.operatorPurchaseOfferId) {
          return selectedOffer;
        } else {
          return item;
        }
      });
      return {
        ...state,
        items: updatedItems
      };
    }

    case actions.RESET_OFFER: {
      const clonedItems = _.cloneDeep(state.items);
      const selectedOffer = _.cloneDeep(state.selectedPurchaseOffer);
      selectedOffer.offerBid = null;
      selectedOffer.offerSubmitted = false;
      selectedOffer.aircraft = null;
      const updatedItems = clonedItems.map(item => {
        if (item.operatorPurchaseOfferId === selectedOffer.operatorPurchaseOfferId) {
          return selectedOffer;
        } else {
          return item;
        }
      });
      return {
        ...state,
        items: updatedItems
      };
    }

    default: {
      return state;
    }
  }
}

export const getCriteria = (state: State) => state.criteria;
export const getCurrentPage = (state: State) => state.currentPage;
export const getIsLoaded = (state: State) => state.isLoaded;
export const getIsLoading = (state: State) => state.isLoading;
export const getItems = (state: State) => state.items;
export const getItemsPerPage = (state: State) => state.itemsPerPage;
export const getItemsTotalCount = (state: State) => state.itemsTotalCount;
export const getSelectedPurchaseOffer = (state: State) => state.selectedPurchaseOffer;
export const getIsSelectedPurchaseOfferLoading = (state: State) => state.isSelectedPurchaseOfferLoading;
export const getIsSelectedPurchaseOfferLoaded = (state: State) => state.isSelectedPurchaseOfferLoaded;
export const getAcceptOfferDialogVisible = (state: State) => state.acceptOfferDialogVisible;
