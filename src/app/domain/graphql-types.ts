// tslint:disable
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Built-in java.math.BigDecimal */
  BigDecimal: number;
  /** Must be a valid aircraft id */
  AirportCodeInput: string;
  /** An ISO-8601 compliant DateTime Scalar */
  IsoDateTime: string;
  /** An email address scalar */
  EmailAddress: string;
  /** An ISO-8601 compliant Date Scalar */
  IsoDate: string;
}

/** Postal address */
export interface Address {
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
}

export interface AddressFilterInput {
  line1?: Maybe<ModelStringFilterInput>;
  line2?: Maybe<ModelStringFilterInput>;
  city?: Maybe<ModelStringFilterInput>;
  state?: Maybe<ModelStringFilterInput>;
  country?: Maybe<ModelStringFilterInput>;
}

export interface Aircraft {
  aircraftId: Scalars['Int'];
  tailNumber: Scalars['String'];
  modelName?: Maybe<Scalars['String']>;
  modelId?: Maybe<Scalars['Int']>;
  categoryName?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['Int']>;
  operatorId?: Maybe<Scalars['String']>;
  operatorName?: Maybe<Scalars['String']>;
  yom?: Maybe<Scalars['Int']>;
  yor?: Maybe<Scalars['Int']>;
  maxPax?: Maybe<Scalars['Int']>;
  insuranceCurrency?: Maybe<Scalars['String']>;
  insuranceAmount?: Maybe<Scalars['Int']>;
  insuranceExpirationDate?: Maybe<Scalars['IsoDate']>;
  insuranceApproved?: Maybe<Scalars['Boolean']>;
  homeBase?: Maybe<Scalars['String']>;
  requiresOwnerApproval?: Maybe<Scalars['Boolean']>;
  deleted?: Maybe<Scalars['Boolean']>;
  shuttleMaxPax?: Maybe<Scalars['Int']>;
  noChange?: Maybe<Scalars['Boolean']>;
  source?: Maybe<Scalars['String']>;
  amenities?: Maybe<Array<AircraftAmenity>>;
  images?: Maybe<Array<AircraftImage>>;
  serviceClassId?: Maybe<Scalars['Int']>;
  completed?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  costPerHour?: Maybe<Scalars['Int']>;
  capacity?: Maybe<Scalars['Int']>;
}

export interface AircraftAmenity {
  id: Scalars['String'];
  name: Scalars['String'];
  visible?: Maybe<Scalars['Boolean']>;
}

export interface AircraftAmenityFilterInput {
  id?: Maybe<ModelStringFilterInput>;
  name?: Maybe<ModelStringFilterInput>;
  visible?: Maybe<ModelBooleanFilterInput>;
}

export interface AircraftFilterInput {
  aircraftId?: Maybe<ModelIntFilterInput>;
  tailNumber?: Maybe<ModelStringFilterInput>;
  modelName?: Maybe<ModelStringFilterInput>;
  modelId?: Maybe<ModelIntFilterInput>;
  categoryName?: Maybe<ModelStringFilterInput>;
  cateogryId?: Maybe<ModelIntFilterInput>;
  operatorId?: Maybe<ModelStringFilterInput>;
  operatorName?: Maybe<ModelStringFilterInput>;
  yom?: Maybe<ModelIntFilterInput>;
  yor?: Maybe<ModelIntFilterInput>;
  maxPax?: Maybe<ModelIntFilterInput>;
  insuranceCurrency?: Maybe<ModelStringFilterInput>;
  insuranceAmount?: Maybe<ModelIntFilterInput>;
  insuranceExpirationDate?: Maybe<ModelIsoDateFilterInput>;
  insuranceApproved?: Maybe<ModelBooleanFilterInput>;
  homeBase?: Maybe<ModelStringFilterInput>;
  requiresOwnerApproval?: Maybe<ModelBooleanFilterInput>;
  deleted?: Maybe<ModelBooleanFilterInput>;
  shuttleMaxPax?: Maybe<ModelIntFilterInput>;
  noChange?: Maybe<ModelBooleanFilterInput>;
  source?: Maybe<ModelStringFilterInput>;
  amenities?: Maybe<AircraftAmenityFilterInput>;
  images?: Maybe<AircraftImageFilterInput>;
  serviceClassId?: Maybe<ModelIntFilterInput>;
  completed?: Maybe<ModelBooleanFilterInput>;
  notes?: Maybe<ModelStringFilterInput>;
  costPerHour?: Maybe<ModelIntFilterInput>;
  capacity?: Maybe<ModelIntFilterInput>;
}

export interface AircraftImage {
  id: Scalars['String'];
  url: Scalars['String'];
  type: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  sortOrder?: Maybe<Scalars['Int']>;
}

export interface AircraftImageFilterInput {
  id?: Maybe<ModelStringFilterInput>;
  url?: Maybe<ModelStringFilterInput>;
  type?: Maybe<ModelStringFilterInput>;
  width?: Maybe<ModelIntFilterInput>;
  height?: Maybe<ModelIntFilterInput>;
}

export interface AircraftPagination {
  aircrafts: Array<Aircraft>;
  pagination?: Maybe<Pagination>;
}

export interface Airport {
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
  icao?: Maybe<Scalars['String']>;
  iata?: Maybe<Scalars['String']>;
  countryCode: Scalars['String'];
  address?: Maybe<Address>;
  active?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Geolocation>;
  timezoneName: Scalars['String'];
  fbos?: Maybe<Array<Fbo>>;
}


export interface AirportFilterInput {
  id?: Maybe<ModelIdFilterInput>;
  code?: Maybe<ModelStringFilterInput>;
  name?: Maybe<ModelStringFilterInput>;
  icao?: Maybe<ModelStringFilterInput>;
  iata?: Maybe<ModelStringFilterInput>;
  countryCode?: Maybe<ModelStringFilterInput>;
  address?: Maybe<AddressFilterInput>;
  active?: Maybe<ModelBooleanFilterInput>;
  location?: Maybe<GeolocationFilterInput>;
  timezoneName?: Maybe<ModelStringFilterInput>;
  fbos?: Maybe<FboFilterInput>;
}

export interface AirportPagination {
  airports: Array<Airport>;
  pagination?: Maybe<Pagination>;
}

export interface AuditLogEvent {
  /** The collection the event is assoicated with */
  collectionName: Scalars['String'];
  /** The id of the document the event is assoicated with */
  documentId: Scalars['String'];
  /** When the event ocurred */
  timestamp: Scalars['IsoDateTime'];
  /** The topic of the event */
  topic: Scalars['String'];
  /** The subject of the event */
  subject: Scalars['String'];
  /** The message content of the event */
  message: Scalars['String'];
  /** The user (or system) that originated the event */
  userEmail?: Maybe<Scalars['String']>;
}

export interface AuditLogEventFilterInput {
  collectionName?: Maybe<ModelStringFilterInput>;
  documentId?: Maybe<ModelStringFilterInput>;
  timestamp?: Maybe<ModelIsoDateTimeFilterInput>;
  topic?: Maybe<ModelStringFilterInput>;
  subject?: Maybe<ModelStringFilterInput>;
  message?: Maybe<ModelStringFilterInput>;
}

export interface AuditLogEventPagination {
  events: Array<AuditLogEvent>;
  pagination?: Maybe<Pagination>;
}

/** This represents the inventory of available fights. */
export interface AvailableFlight {
  availableFlightId: Scalars['ID'];
  status: AvailableFlightStatus;
  departureTime: Scalars['IsoDateTime'];
  departureTimeUTC: Scalars['IsoDateTime'];
  arrivalTime?: Maybe<Scalars['IsoDateTime']>;
  arrivalTimeUTC?: Maybe<Scalars['IsoDateTime']>;
  emptyLeg?: Maybe<EmptyLeg>;
  /** Estimated flight time (minutes) */
  eft?: Maybe<Scalars['Int']>;
  contractType: FlightContractType;
  priceType?: Maybe<FlightPriceType>;
  /** The number seats the operator has made available */
  seatsOffered?: Maybe<Scalars['Int']>;
  /** The number of seats that can be booked. */
  seatsAvailable?: Maybe<Scalars['Int']>;
  /** External reference information for operator use */
  externalId?: Maybe<Scalars['String']>;
  legacyLegId?: Maybe<Scalars['Int']>;
  sharedCharterId?: Maybe<Scalars['Int']>;
  aircraft?: Maybe<Aircraft>;
  departureFbo?: Maybe<Fbo>;
  departureAirport?: Maybe<Airport>;
  arrivalFbo?: Maybe<Fbo>;
  arrivalAirport?: Maybe<Airport>;
  operator?: Maybe<Operator>;
  /** Per seat pricing applied shuttle flights */
  shuttlePricing?: Maybe<ShuttlePricing>;
  /** Pricing applied for charter flights */
  charterPricing?: Maybe<CharterPricing>;
  /**  createUser: User   */
  creationTime?: Maybe<Scalars['IsoDateTime']>;
  expirationTime?: Maybe<Scalars['IsoDateTime']>;
  email?: Maybe<Array<Maybe<Email>>>;
  bookings?: Maybe<Array<Booking>>;
  passengers?: Maybe<Array<Passenger>>;
  auditLog?: Maybe<Array<Maybe<AuditLogEvent>>>;
  shuttlePriceHistory?: Maybe<Array<ShuttlePricing>>;
  charterPriceHistory?: Maybe<Array<CharterPricing>>;
}

export interface AvailableFlightFilterInput {
  availableFlightId?: Maybe<ModelIdFilterInput>;
  status?: Maybe<AvailableFlightStatusFilterInput>;
  contractType?: Maybe<FlightContractTypeFilterInput>;
  priceType?: Maybe<FlightPriceTypeFilterInput>;
  flightPrice?: Maybe<ModelBigDecimalFilterInput>;
  emptyLeg?: Maybe<EmptyLegFilterInput>;
  seatPrice?: Maybe<ModelBigDecimalFilterInput>;
  seatsOffered?: Maybe<ModelIntFilterInput>;
  seatsAvailable?: Maybe<ModelIntFilterInput>;
  eft?: Maybe<ModelIntFilterInput>;
  externalId?: Maybe<ModelStringFilterInput>;
  creationTime?: Maybe<ModelIsoDateTimeFilterInput>;
  legacyLegId?: Maybe<ModelIntFilterInput>;
  sharedCharterId?: Maybe<ModelIntFilterInput>;
  aircraft?: Maybe<AircraftFilterInput>;
  operator?: Maybe<OperatorFilterInput>;
  departureTime?: Maybe<ModelIsoDateTimeFilterInput>;
  departureTimeUTC?: Maybe<ModelIsoDateTimeFilterInput>;
  departureFbo?: Maybe<FboFilterInput>;
  departureAirport?: Maybe<AirportFilterInput>;
  arrivalTime?: Maybe<ModelIsoDateTimeFilterInput>;
  arrivalTimeUTC?: Maybe<ModelIsoDateTimeFilterInput>;
  arrivalFBO?: Maybe<FboFilterInput>;
  arrivalAirport?: Maybe<AirportFilterInput>;
  seatPricing?: Maybe<ShuttlePricingFilterInput>;
  flightPricing?: Maybe<CharterPricingFilterInput>;
  bookings?: Maybe<BookingFilterInput>;
  passengers?: Maybe<PassengerFilterInput>;
  auditLog?: Maybe<AuditLogEventFilterInput>;
}

export interface AvailableFlightPagination {
  availableFlights: Array<AvailableFlight>;
  pagination?: Maybe<Pagination>;
}

export enum AvailableFlightStatus {
  /**
   * The flight is open for booking.
   *
   * Flights when created are OPEN.
   *
   * Only CLOSED flights maybe OPEN.
   */
  Open = 'OPEN',
  /**
   * The flight has been booked.
   * Once booked flights cannot
   * be closed.
   *
   * For shuttles this indicates
   * that at least one seat has
   * been booked.
   *
   * Only OPEN flights maybe BOOKED.
   *
   * For charters this indicates
   * that the flight has been sold.
   */
  Booked = 'BOOKED',
  /**
   * The flight was not sold
   * before departure time
   * but is no longer available.
   *
   * Only OPEN or CLOSED flights
   * may be EXPIRED.
   *
   * Bookings are not permitted.
   */
  Expired = 'EXPIRED',
  /**
   * Either seats or whole the flight
   * was sold and has been completed.
   *
   * Only BOOKED flights maybe COMPLETED.
   *
   * Bookings are not permitted.
   */
  Completed = 'COMPLETED',
  /**
   * The flight is closed for bookings.
   *
   * Only OPEN flights maybe CLOSED.
   */
  Closed = 'CLOSED'
}

export interface AvailableFlightStatusFilterInput {
  ne?: Maybe<AvailableFlightStatus>;
  eq?: Maybe<AvailableFlightStatus>;
}


export interface Booking {
  lastUpdated: Scalars['IsoDateTime'];
  passengerCount: Scalars['Int'];
  /** The pricing in effect when the booking was made */
  price: ShuttlePricing;
}

export interface BookingFilterInput {
  lastUpdated?: Maybe<ModelIsoDateTimeFilterInput>;
  passengerCount?: Maybe<ModelIntFilterInput>;
  price?: Maybe<ShuttlePricingFilterInput>;
}

export interface CharterFlightEstimate {
  absoluteMinimum: CharterPricing;
  absoluteMaximum: CharterPricing;
  suggestedMinimum: CharterPricing;
  suggestedMaximum: CharterPricing;
}

export enum CharterPermissionsEnum {
  Ok = 'OK',
  RouteLimitExceeded = 'ROUTE_LIMIT_EXCEEDED'
}

export interface CharterPricing {
  /** The price offered to the customer for a seat. */
  flightPrice: Scalars['BigDecimal'];
  /** The amount remitted to the operator (broker share + federal tax cost + segment fee) */
  operatorRevenue: Scalars['BigDecimal'];
  /** The amount paid to the broker ( charter price + broker share ) */
  brokerRevenue: Scalars['BigDecimal'];
  /** The rate charged by the broker */
  brokerRate: Scalars['BigDecimal'];
  /** The price paid by the customer (charter cost + credit card cost). */
  customerPrice?: Maybe<Scalars['BigDecimal']>;
  /** Percent of the charter price collected by the broker (charter price * broker share ) */
  brokerShare: Scalars['Float'];
  /** Percent of the seat price collected by the operator (charter price - broker share ) */
  operatorShare: Scalars['BigDecimal'];
  /** Taxes paid to the Federal government */
  federalTaxCost?: Maybe<Scalars['BigDecimal']>;
  /** Per flight cost for segment fees */
  segmentFeeCost?: Maybe<Scalars['BigDecimal']>;
  /** The date time that this price become in effect. */
  effective: Scalars['IsoDateTime'];
  /** The date time that this price was superseded with another price. */
  superseded?: Maybe<Scalars['IsoDateTime']>;
  /** The user that set this price */
  user: User;
}

export interface CharterPricingFilterInput {
  charterPrice?: Maybe<ModelBigDecimalFilterInput>;
  operatorRevenue?: Maybe<ModelBigDecimalFilterInput>;
  brokerRevenue?: Maybe<ModelBigDecimalFilterInput>;
  customerPrice?: Maybe<ModelBigDecimalFilterInput>;
  brokerShare?: Maybe<ModelBigDecimalFilterInput>;
  operatorShare?: Maybe<ModelBigDecimalFilterInput>;
  federalTaxCost?: Maybe<ModelBigDecimalFilterInput>;
  segmentFeeCost?: Maybe<ModelBigDecimalFilterInput>;
  effective?: Maybe<ModelIsoDateTimeFilterInput>;
  superseded?: Maybe<ModelIsoDateTimeFilterInput>;
  user?: Maybe<UserFilterInput>;
}

/** Create a new available flight */
export interface CreateAvailableFlightInput {
  aircraftId: Scalars['Int'];
  departureTime: Scalars['IsoDateTime'];
  departureFboId?: Maybe<Scalars['Int']>;
  departureAirportCode?: Maybe<Scalars['String']>;
  /** Estimated flight time in minutes */
  eft: Scalars['Int'];
  /**
   * Arrival time is only required when creating empty legs. For an empty leg
   * represents the time when the aircraft should be at the arrival airport/FBO.
   */
  arrivalTime?: Maybe<Scalars['IsoDateTime']>;
  /** The arrival FBO.  Must be specified if arrivalAirportCode is not. */
  arrivalFboId?: Maybe<Scalars['Int']>;
  /** The arrival airport. Must be specified if the arrivalDboId is not.  */
  arrivalAirportCode?: Maybe<Scalars['String']>;
  contractType: FlightContractType;
  priceType: FlightPriceType;
  emptyLeg?: Maybe<EmptyLegInput>;
  /**
   * The price the operator is charging for a whole plane, required if contract
   * price is CHARTER
   */
  flightPrice?: Maybe<Scalars['BigDecimal']>;
  /**
   * The price the operator is charging per a seat, required if the contract type
   * is SHUTTLE
   */
  seatPrice?: Maybe<Scalars['BigDecimal']>;
  /**
   * The number of seats the operator is offering for sale, required if the contract
   * type is SHUTTLE
   */
  seatsOffered?: Maybe<Scalars['Int']>;
  /** An external id or comment for correlation with operator processes. */
  externalId?: Maybe<Scalars['String']>;
}

export interface Email {
  correlationId?: Maybe<Scalars['String']>;
  recipients?: Maybe<Array<Maybe<Scalars['EmailAddress']>>>;
  cc?: Maybe<Array<Maybe<Scalars['EmailAddress']>>>;
  bcc?: Maybe<Array<Maybe<Scalars['EmailAddress']>>>;
  subject: Scalars['String'];
  sent?: Maybe<Scalars['IsoDateTime']>;
  body?: Maybe<Scalars['String']>;
}


export interface EmailAddressFilterInput {
  ne?: Maybe<Scalars['EmailAddress']>;
  eq?: Maybe<Scalars['EmailAddress']>;
  le?: Maybe<Scalars['EmailAddress']>;
  lt?: Maybe<Scalars['EmailAddress']>;
  ge?: Maybe<Scalars['EmailAddress']>;
  gt?: Maybe<Scalars['EmailAddress']>;
}

/** Defines the parameters for sending emails. */
export interface EmailConfig {
  /** The unique name to identify this configuration */
  name: Scalars['String'];
  /** The template to use */
  template: Scalars['String'];
  /** The event that triggers when this email is generated. */
  event?: Maybe<EmailEvent>;
  /** The subject of this email. */
  subject?: Maybe<Scalars['String']>;
  /** The indicates that this email should be send to operator agents. (default: false) */
  notifyOperator?: Maybe<Scalars['Boolean']>;
  /** The indicates that this email should be archived to S3. (default: false) */
  archive?: Maybe<Scalars['Boolean']>;
  /** The list of recipients this email should go to. */
  recipients?: Maybe<Array<Scalars['EmailAddress']>>;
  /** The list of cc recipient this email should go to. */
  cc?: Maybe<Array<Scalars['EmailAddress']>>;
  /** The list of bcc recipient this email should go to. */
  bcc?: Maybe<Array<Scalars['EmailAddress']>>;
  /** The name of the context element in the template. */
  context: Scalars['String'];
  /** The list of attachments for this email */
  attachments?: Maybe<Array<EmailConfigAttachment>>;
}

export interface EmailConfigAttachment {
  /** The name of the configuration to use for the attachment */
  name: Scalars['String'];
  /** The name that the attachment appears as in the email */
  attachmentName: Scalars['String'];
}

export interface EmailConfigAttachmentFilterInput {
  name?: Maybe<ModelStringFilterInput>;
  attachmentName?: Maybe<ModelStringFilterInput>;
}

export interface EmailConfigAttachmentInput {
  /** The name of the configuration to use for the attachment */
  name: Scalars['String'];
  /** The name that the attachment appears as in the email */
  attachmentName: Scalars['String'];
}

export interface EmailConfigFilterInput {
  name?: Maybe<ModelStringFilterInput>;
  template?: Maybe<ModelStringFilterInput>;
  event?: Maybe<EmailEventFilterInput>;
  archive?: Maybe<ModelBooleanFilterInput>;
  notifyOperator?: Maybe<ModelBooleanFilterInput>;
  subject?: Maybe<ModelStringFilterInput>;
  recipients?: Maybe<EmailAddressFilterInput>;
  cc?: Maybe<EmailAddressFilterInput>;
  bcc?: Maybe<EmailAddressFilterInput>;
  context?: Maybe<EmailAddressFilterInput>;
  attachments?: Maybe<EmailConfigAttachmentFilterInput>;
}

export interface EmailConfigInput {
  name: Scalars['String'];
  template: Scalars['String'];
  event?: Maybe<EmailEvent>;
  subject: Scalars['String'];
  /** The indicates that this email should be archived to S3. */
  archive?: Maybe<Scalars['Boolean']>;
  /** The indicates that this email should be send to operator agents. */
  notifyOperator: Scalars['Boolean'];
  /** The list of recipients this email should go to. */
  recipients?: Maybe<Array<Scalars['EmailAddress']>>;
  /** The list of cc recipient this email should go to. */
  cc?: Maybe<Array<Scalars['EmailAddress']>>;
  /** The list of bcc recipient this email should go to. */
  bcc?: Maybe<Array<Scalars['EmailAddress']>>;
  /** The name of the context element in the template. */
  context?: Maybe<Scalars['String']>;
  /** The list of attachments for this email */
  attachments?: Maybe<Array<EmailConfigAttachmentInput>>;
}

export interface EmailConfigPagination {
  emailConfigs: Array<EmailConfig>;
  pagination?: Maybe<Pagination>;
}

export enum EmailEvent {
  PrivateCharterCreated = 'PRIVATE_CHARTER_CREATED',
  PrivateCharterBooked = 'PRIVATE_CHARTER_BOOKED',
  PrivateCharterCancelled = 'PRIVATE_CHARTER_CANCELLED',
  PrivateCharterStatusChanged = 'PRIVATE_CHARTER_STATUS_CHANGED',
  PrivateCharterUpdated = 'PRIVATE_CHARTER_UPDATED',
  PrivateCharterPreflight_24 = 'PRIVATE_CHARTER_PREFLIGHT_24',
  PrivateCharterPreflight_3 = 'PRIVATE_CHARTER_PREFLIGHT_3',
  PrivateCharterExpired = 'PRIVATE_CHARTER_EXPIRED',
  PrivateCharterCompleted = 'PRIVATE_CHARTER_COMPLETED',
  PrivateCharterPostflight = 'PRIVATE_CHARTER_POSTFLIGHT',
  SharedCharterCreated = 'SHARED_CHARTER_CREATED',
  SharedCharterSeatsBooked = 'SHARED_CHARTER_SEATS_BOOKED',
  SharedCharterSeatsCancelled = 'SHARED_CHARTER_SEATS_CANCELLED',
  SharedCharterStatusChanged = 'SHARED_CHARTER_STATUS_CHANGED',
  SharedCharterUpdated = 'SHARED_CHARTER_UPDATED',
  SharedCharterPreflight_24 = 'SHARED_CHARTER_PREFLIGHT_24',
  SharedCharterPreflight_3 = 'SHARED_CHARTER_PREFLIGHT_3',
  SharedCharterExpired = 'SHARED_CHARTER_EXPIRED',
  SharedCharterCompleted = 'SHARED_CHARTER_COMPLETED',
  SharedCharterPostflight = 'SHARED_CHARTER_POSTFLIGHT'
}

export interface EmailEventFilterInput {
  ne?: Maybe<EmailEvent>;
  eq?: Maybe<EmailEvent>;
}

export interface EmptyLeg {
  departureAirports?: Maybe<Array<Maybe<Airport>>>;
  arrivalAirports?: Maybe<Array<Maybe<Airport>>>;
  departureAirportCodes?: Maybe<Array<Scalars['String']>>;
  arrivalAirportCodes?: Maybe<Array<Scalars['String']>>;
  departureFboIds?: Maybe<Array<Scalars['String']>>;
  arrivalFboIds?: Maybe<Array<Scalars['String']>>;
  arrivalTime?: Maybe<Scalars['IsoDateTime']>;
  landingFee?: Maybe<Scalars['BigDecimal']>;
  densityFee?: Maybe<Scalars['BigDecimal']>;
  flexibility: Scalars['Float'];
}

export interface EmptyLegFilterInput {
  departureAirports?: Maybe<AirportFilterInput>;
  arrivalAirport?: Maybe<AirportFilterInput>;
  arrivalTime?: Maybe<ModelIsoDateTimeFilterInput>;
  landingFee?: Maybe<ModelBigDecimalFilterInput>;
  densityFee?: Maybe<ModelBigDecimalFilterInput>;
  flexibility?: Maybe<ModelFloatFilterInput>;
}

export interface EmptyLegInput {
  departureAirportCodes?: Maybe<Array<Scalars['AirportCodeInput']>>;
  arrivalAirportCodes?: Maybe<Array<Scalars['AirportCodeInput']>>;
  departureFboIds?: Maybe<Array<Scalars['String']>>;
  arrivalFboIds?: Maybe<Array<Scalars['String']>>;
  arrivalTime: Scalars['IsoDateTime'];
  landingFee?: Maybe<Scalars['BigDecimal']>;
  densityFee?: Maybe<Scalars['BigDecimal']>;
  flexibility: Scalars['Float'];
}

export interface Fbo {
  id: Scalars['ID'];
  fboId: Scalars['String'];
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  officeHours?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
}

export interface FboFilterInput {
  id?: Maybe<ModelIdFilterInput>;
  fboId?: Maybe<ModelStringFilterInput>;
  name?: Maybe<ModelStringFilterInput>;
  phoneNumber?: Maybe<ModelStringFilterInput>;
  officeHours?: Maybe<ModelStringFilterInput>;
  address?: Maybe<AddressFilterInput>;
}

export enum FlightContractType {
  Shuttle = 'SHUTTLE',
  Charter = 'CHARTER',
  Empty = 'EMPTY'
}

export interface FlightContractTypeFilterInput {
  ne?: Maybe<FlightContractType>;
  eq?: Maybe<FlightContractType>;
}

export interface FlightEstimate {
  distance: Scalars['Int'];
  minimumEft: Scalars['Int'];
  maximumEft: Scalars['Int'];
  costPerHour?: Maybe<Scalars['Int']>;
  capacity?: Maybe<Scalars['Int']>;
  shuttlePricing?: Maybe<ShuttleFlightEstimate>;
  charterPricing?: Maybe<CharterFlightEstimate>;
}

export interface FlightEstimateInput {
  departureAirportCode: Scalars['String'];
  arrivalAirportCode: Scalars['String'];
  contractType?: Maybe<FlightContractType>;
  aircraftId?: Maybe<Scalars['Int']>;
}

export enum FlightPriceType {
  Dynamic = 'DYNAMIC',
  Fixed = 'FIXED',
  Empty = 'EMPTY'
}

export interface FlightPriceTypeFilterInput {
  ne?: Maybe<FlightPriceType>;
  eq?: Maybe<FlightPriceType>;
}

/**  request for a single flight between airports. */
export interface FlightRequest {
  departureAirportCode: Scalars['Int'];
  departureTime: Scalars['IsoDateTime'];
  departureAirport: Airport;
  arrivalAirportCode: Scalars['Int'];
  arrivalTime?: Maybe<Scalars['IsoDateTime']>;
  arrivalAirport: Airport;
  seatCount?: Maybe<Scalars['Int']>;
}

export interface FlightRequestFilterInput {
  departureAirportCode?: Maybe<ModelStringFilterInput>;
  departureTime?: Maybe<ModelStringFilterInput>;
  departureAirport?: Maybe<AirportFilterInput>;
  arrivalAirportCode?: Maybe<ModelStringFilterInput>;
  arrivalTime?: Maybe<ModelStringFilterInput>;
  arrivalAirport?: Maybe<AirportFilterInput>;
  seatCount?: Maybe<ModelIntFilterInput>;
}

/** Provides Latitude and Longitude */
export interface Geolocation {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
}

export interface GeolocationFilterInput {
  latitude?: Maybe<ModelFloatFilterInput>;
  longitude?: Maybe<ModelFloatFilterInput>;
}


export interface ModelBigDecimalFilterInput {
  ne?: Maybe<Scalars['BigDecimal']>;
  eq?: Maybe<Scalars['BigDecimal']>;
  le?: Maybe<Scalars['BigDecimal']>;
  lt?: Maybe<Scalars['BigDecimal']>;
  ge?: Maybe<Scalars['BigDecimal']>;
  gt?: Maybe<Scalars['BigDecimal']>;
}

export interface ModelBooleanFilterInput {
  ne?: Maybe<Scalars['Boolean']>;
  eq?: Maybe<Scalars['Boolean']>;
}

export interface ModelFloatFilterInput {
  ne?: Maybe<Scalars['Float']>;
  eq?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  contains?: Maybe<Scalars['Float']>;
}

export interface ModelIdFilterInput {
  ne?: Maybe<Scalars['ID']>;
  eq?: Maybe<Scalars['ID']>;
  le?: Maybe<Scalars['ID']>;
  lt?: Maybe<Scalars['ID']>;
  ge?: Maybe<Scalars['ID']>;
  gt?: Maybe<Scalars['ID']>;
  contains?: Maybe<Scalars['ID']>;
  /**
   * notContains: ID
   * between: [ID]
   */
  startsWith?: Maybe<Scalars['ID']>;
}

export interface ModelIntFilterInput {
  ne?: Maybe<Scalars['Int']>;
  eq?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  contains?: Maybe<Scalars['Int']>;
}

export interface ModelIsoDateFilterInput {
  ne?: Maybe<Scalars['IsoDate']>;
  eq?: Maybe<Scalars['IsoDate']>;
  le?: Maybe<Scalars['IsoDate']>;
  lt?: Maybe<Scalars['IsoDate']>;
  ge?: Maybe<Scalars['IsoDate']>;
  gt?: Maybe<Scalars['IsoDate']>;
}

export interface ModelIsoDateTimeFilterInput {
  ne?: Maybe<Scalars['IsoDateTime']>;
  eq?: Maybe<Scalars['IsoDateTime']>;
  le?: Maybe<Scalars['IsoDateTime']>;
  lt?: Maybe<Scalars['IsoDateTime']>;
  ge?: Maybe<Scalars['IsoDateTime']>;
  gt?: Maybe<Scalars['IsoDateTime']>;
}

export interface ModelStringFilterInput {
  ne?: Maybe<Scalars['String']>;
  eq?: Maybe<Scalars['String']>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  /**
   * notContains: String
   * between: [String]
   */
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
}

export interface Mutation {
  createAvailableFlight?: Maybe<AvailableFlight>;
  updateAvailableFlight?: Maybe<AvailableFlight>;
  /** Removes an email config definition */
  removeEmailConfig?: Maybe<Scalars['Boolean']>;
  /** Updates or creates an email configuration */
  putEmailConfig?: Maybe<EmailConfig>;
  /** Updates an operator */
  updateOperator?: Maybe<Operator>;
}


export interface MutationCreateAvailableFlightArgs {
  input?: Maybe<CreateAvailableFlightInput>;
}


export interface MutationUpdateAvailableFlightArgs {
  input: UpdateAvailableFlightInput;
}


export interface MutationRemoveEmailConfigArgs {
  name: Scalars['String'];
}


export interface MutationPutEmailConfigArgs {
  input: EmailConfigInput;
}


export interface MutationUpdateOperatorArgs {
  input: OperatorInput;
}

export interface Operator {
  id: Scalars['ID'];
  name: Scalars['String'];
  legalName: Scalars['String'];
  /** Indicates that the operator should be sent offers before other operators */
  offerPreviews?: Maybe<Scalars['Boolean']>;
  /** Indicates that the operator should automatically receive fulfullment offers */
  automatedSourcingForGuaranteed?: Maybe<Scalars['Boolean']>;
  /**
   * Indicates that this operator can run more then four shared charters a week
   * on a route between airports.
   */
  allowShuttles?: Maybe<Scalars['Boolean']>;
  sapIntegration?: Maybe<OperatorSapIntegration>;
  aircraft?: Maybe<Array<Maybe<Aircraft>>>;
}

export interface OperatorFilterInput {
  id?: Maybe<ModelIdFilterInput>;
  name?: Maybe<ModelStringFilterInput>;
  legalName?: Maybe<ModelStringFilterInput>;
  offerPreviews?: Maybe<ModelBooleanFilterInput>;
  automatedSourcingForGuaranteed?: Maybe<ModelBooleanFilterInput>;
  allowShuttles?: Maybe<ModelBooleanFilterInput>;
  sapIntegration?: Maybe<OperatorSapIntegrationFilterInput>;
  aircraft?: Maybe<AircraftFilterInput>;
}

export interface OperatorInput {
  id: Scalars['ID'];
  /**
   * Indicates that this operator can run more then four shared charters a week
   * on a route between airports.
   */
  allowShuttles?: Maybe<Scalars['Boolean']>;
}

export interface OperatorPagination {
  operators: Array<Operator>;
  pagination?: Maybe<Pagination>;
}

export interface OperatorSapIntegration {
  sapVendorId?: Maybe<Scalars['Int']>;
  qaSapVectorId?: Maybe<Scalars['Int']>;
}

export interface OperatorSapIntegrationFilterInput {
  sapVendorId?: Maybe<ModelIntFilterInput>;
  qaSapVectorId?: Maybe<ModelIntFilterInput>;
}

export interface Pagination {
  count?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}

export interface PaginationInput {
  skip: Scalars['Int'];
  limit: Scalars['Int'];
}

export interface Passenger {
  legalName?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['IsoDate']>;
  price: ShuttlePricing;
  weight?: Maybe<Scalars['Int']>;
}

export interface PassengerFilterInput {
  legalName?: Maybe<ModelStringFilterInput>;
  dateOfBirth?: Maybe<ModelIsoDateFilterInput>;
  price?: Maybe<ShuttlePricingFilterInput>;
  weight?: Maybe<ModelIntFilterInput>;
}

export interface PriceDetailsInput {
  basePrice: Scalars['BigDecimal'];
  seatsCount?: Maybe<Scalars['Int']>;
  departureAirportCode: Scalars['AirportCodeInput'];
  arrivalAirportCode: Scalars['AirportCodeInput'];
  /** The anticipated departure time, allows determination of whether the flight is permitted. */
  departureTime?: Maybe<Scalars['IsoDateTime']>;
}

export interface Query {
  /** @deprecated Field no longer supported */
  calculateShuttlePriceDetails?: Maybe<ShuttlePricing>;
  calculateSharedCharterPrice?: Maybe<ShuttlePricing>;
  /** @deprecated Field no longer supported */
  calculateCharterPriceDetails?: Maybe<CharterPricing>;
  calculatePrivateCharterPrice?: Maybe<CharterPricing>;
  getAircraft?: Maybe<Aircraft>;
  getAirport?: Maybe<Airport>;
  getAvailableFlight?: Maybe<AvailableFlight>;
  getOperator?: Maybe<Operator>;
  getEmailConfig?: Maybe<EmailConfig>;
  listAircrafts: AircraftPagination;
  listAirports: AirportPagination;
  listAvailableFlights: AvailableFlightPagination;
  listAuditLogEvents?: Maybe<AuditLogEventPagination>;
  listOperators: OperatorPagination;
  listEmailConfigs: EmailConfigPagination;
  estimateFlight?: Maybe<FlightEstimate>;
}


export interface QueryCalculateShuttlePriceDetailsArgs {
  basePrice: Scalars['BigDecimal'];
  seatsCount?: Maybe<Scalars['Int']>;
  departureAirportCode: Scalars['AirportCodeInput'];
  arrivalAirportCode: Scalars['AirportCodeInput'];
}


export interface QueryCalculateSharedCharterPriceArgs {
  input: PriceDetailsInput;
}


export interface QueryCalculateCharterPriceDetailsArgs {
  basePrice: Scalars['BigDecimal'];
  seatsCount?: Maybe<Scalars['Int']>;
  departureAirportCode: Scalars['AirportCodeInput'];
  arrivalAirportCode: Scalars['AirportCodeInput'];
}


export interface QueryCalculatePrivateCharterPriceArgs {
  input: PriceDetailsInput;
}


export interface QueryGetAircraftArgs {
  aircraftId: Scalars['Int'];
}


export interface QueryGetAirportArgs {
  airportId: Scalars['String'];
}


export interface QueryGetAvailableFlightArgs {
  availableFlightId: Scalars['String'];
}


export interface QueryGetOperatorArgs {
  operatorId: Scalars['String'];
}


export interface QueryGetEmailConfigArgs {
  id: Scalars['String'];
}


export interface QueryListAircraftsArgs {
  filter?: Maybe<AircraftFilterInput>;
  pagination?: Maybe<PaginationInput>;
}


export interface QueryListAirportsArgs {
  filter?: Maybe<AirportFilterInput>;
  pagination?: Maybe<PaginationInput>;
}


export interface QueryListAvailableFlightsArgs {
  filter?: Maybe<AvailableFlightFilterInput>;
  pagination?: Maybe<PaginationInput>;
}


export interface QueryListAuditLogEventsArgs {
  filter?: Maybe<AuditLogEventFilterInput>;
  pagination?: Maybe<PaginationInput>;
}


export interface QueryListOperatorsArgs {
  filter?: Maybe<OperatorFilterInput>;
  pagination?: Maybe<PaginationInput>;
}


export interface QueryListEmailConfigsArgs {
  filter?: Maybe<EmailConfigFilterInput>;
  pagination?: Maybe<PaginationInput>;
}


export interface QueryEstimateFlightArgs {
  input: FlightEstimateInput;
}

export interface ShuttleFlightEstimate {
  absoluteMinimum: ShuttlePricing;
  absoluteMaximum: ShuttlePricing;
  suggestedMinimum: ShuttlePricing;
  suggestedMaximum: ShuttlePricing;
}

export interface ShuttlePricing {
  /** Indicates if the charter can be created or why it's disallowed. */
  permitted?: Maybe<CharterPermissionsEnum>;
  /** The price offered to the customer for a seat. */
  seatPrice: Scalars['BigDecimal'];
  /** The number of seats being offered */
  seatsOffered?: Maybe<Scalars['Int']>;
  /** The amount paid to the operator (operator share + federal tax cost + segment fee) */
  operatorRevenue: Scalars['BigDecimal'];
  /** The amount paid to the broker ( broker share + credit card fee ) */
  brokerRevenue: Scalars['BigDecimal'];
  /** The price paid by the customer (seat cost + segment fee + federal tax + credit card cost). */
  customerPrice?: Maybe<Scalars['BigDecimal']>;
  /** The rate charged by the broker */
  brokerRate?: Maybe<Scalars['BigDecimal']>;
  /** The portion of the seat price collected by the broker (seat price * broker share ) */
  brokerShare: Scalars['Float'];
  /** The portion of the seat price collected by the operator (seat price - broker share ) */
  operatorShare: Scalars['BigDecimal'];
  /** The credit card transaction cost charged to the customer */
  creditCardCost?: Maybe<Scalars['BigDecimal']>;
  /** Taxes paid to the Federal government */
  federalTaxCost?: Maybe<Scalars['BigDecimal']>;
  /** Per seat cost for segment fee */
  segmentFeeCost?: Maybe<Scalars['BigDecimal']>;
  /** The date time that this price become in effect. */
  effective?: Maybe<Scalars['IsoDateTime']>;
  /** The date time that this price was superseded with another price. */
  superseded?: Maybe<Scalars['IsoDateTime']>;
  /** The user that set this price */
  user?: Maybe<User>;
}

export interface ShuttlePricingFilterInput {
  seatPrice?: Maybe<ModelBigDecimalFilterInput>;
  operatorRevenue?: Maybe<ModelBigDecimalFilterInput>;
  brokerRevenue?: Maybe<ModelBigDecimalFilterInput>;
  customerPrice?: Maybe<ModelBigDecimalFilterInput>;
  brokerShare?: Maybe<ModelFloatFilterInput>;
  operatorShare?: Maybe<ModelBigDecimalFilterInput>;
  creditCardCost?: Maybe<ModelBigDecimalFilterInput>;
  federalTaxCost?: Maybe<ModelBigDecimalFilterInput>;
  segmentFeeCost?: Maybe<ModelBigDecimalFilterInput>;
  effective?: Maybe<ModelIsoDateTimeFilterInput>;
  superseded?: Maybe<ModelIsoDateTimeFilterInput>;
  user?: Maybe<UserFilterInput>;
}

/**  request for one or more flights */
export interface SourcingRequest {
  id: Scalars['ID'];
  status: SourcingRequestStatus;
  requestId: Scalars['String'];
  aircraftCategoryId: Scalars['Int'];
  serviceClassId: Scalars['Int'];
  maxPrice: Scalars['BigDecimal'];
  opportunityId?: Maybe<Scalars['String']>;
  legs: Array<FlightRequest>;
}

export interface SourcingRequestFilterInput {
  id?: Maybe<ModelIdFilterInput>;
  status?: Maybe<ModelStringFilterInput>;
  requestId?: Maybe<ModelStringFilterInput>;
  aircraftCategoryId?: Maybe<ModelIntFilterInput>;
  serviceClassId?: Maybe<ModelIntFilterInput>;
  maxPrice?: Maybe<ModelBigDecimalFilterInput>;
  opportunityId?: Maybe<ModelStringFilterInput>;
  legs?: Maybe<FlightRequestFilterInput>;
}

export enum SourcingRequestStatus {
  Incoming = 'INCOMING',
  Fulfilled = 'FULFILLED',
  Cancelled = 'CANCELLED'
}

export interface SuggestedSeatPrice {
  absoluteMinimum: Scalars['Float'];
  absoluteMaximum: Scalars['Float'];
  suggestedMinimum: Scalars['Float'];
  suggestedMaximum: Scalars['Float'];
}

/** Update an existing available flight */
export interface UpdateAvailableFlightInput {
  availableFlightId: Scalars['String'];
  status?: Maybe<AvailableFlightStatus>;
  charterPrice?: Maybe<Scalars['BigDecimal']>;
  seatPrice?: Maybe<Scalars['BigDecimal']>;
  seatsOffered?: Maybe<Scalars['Int']>;
  emptyLeg?: Maybe<EmptyLegInput>;
}

export interface User {
  /** The system user application id */
  applicationId?: Maybe<Scalars['Boolean']>;
  /** The system display name */
  displayName?: Maybe<Scalars['String']>;
  /** The users current session ID */
  sessionId?: Maybe<Scalars['Int']>;
  /** The current user ID */
  userId?: Maybe<Scalars['Int']>;
  /** The user type ID */
  userTypeId?: Maybe<Scalars['Int']>;
  /** The JetApp organization id the user is a member of */
  organizationId?: Maybe<Scalars['Int']>;
  /** The organization uuid (guid) the user is a member of */
  organizationUuid?: Maybe<Scalars['String']>;
  /** The users first name */
  firstName?: Maybe<Scalars['String']>;
  /** The users last name */
  lastName?: Maybe<Scalars['String']>;
  /** The users email address */
  emailAddress?: Maybe<Scalars['EmailAddress']>;
  expirationDate?: Maybe<Scalars['IsoDateTime']>;
}

export interface UserFilterInput {
  /** The system user application id */
  applicationId?: Maybe<ModelBooleanFilterInput>;
  /** The system display name */
  displayName?: Maybe<ModelStringFilterInput>;
  /** The users current session ID */
  sessionId?: Maybe<ModelIntFilterInput>;
  /** The current user ID */
  userId?: Maybe<ModelIntFilterInput>;
  /** The user type ID */
  userTypeId?: Maybe<ModelIntFilterInput>;
  /** The JetApp organization id the user is a member of */
  organizationId?: Maybe<ModelIntFilterInput>;
  /** The organization uuid (guid) the user is a member of */
  organizationUuid?: Maybe<ModelStringFilterInput>;
  /** The users first name */
  firstName?: Maybe<ModelStringFilterInput>;
  /** The users last name */
  lastName?: Maybe<ModelStringFilterInput>;
  /** The users email address */
  emailAddress?: Maybe<EmailAddressFilterInput>;
  expirationDate?: Maybe<ModelIsoDateTimeFilterInput>;
}

export type ListAircraftsQueryVariables = {
  filter?: Maybe<AircraftFilterInput>;
};


export type ListAircraftsQuery = { listAircrafts: { aircrafts: Array<Pick<Aircraft, 'modelName' | 'aircraftId' | 'maxPax' | 'tailNumber' | 'insuranceExpirationDate' | 'deleted' | 'insuranceApproved' | 'completed'>> } };

export type GetAirportQueryVariables = {
  code?: Maybe<AirportFilterInput>;
};


export type GetAirportQuery = { listAirports: { airports: Array<Pick<Airport, 'name' | 'code'>> } };

export type GetAirportFboQueryVariables = {
  code: Scalars['String'];
};


export type GetAirportFboQuery = {
  getAirport?: Maybe<{
    fbos?: Maybe<Array<(
      Pick<Fbo, 'name' | 'fboId'>
      & { address?: Maybe<Pick<Address, 'state' | 'country' | 'city'>> }
      )>>
  }>
};

export type CreateAvailableFlightMutationVariables = {
  input?: Maybe<CreateAvailableFlightInput>;
};


export type CreateAvailableFlightMutation = { createAvailableFlight?: Maybe<Pick<AvailableFlight, 'availableFlightId'>> };

export type GetFlightDetailsByLegIdQueryVariables = {
  legId?: Maybe<AvailableFlightFilterInput>;
};


export type GetFlightDetailsByLegIdQuery = {
  listAvailableFlights: {
    availableFlights: Array<(
      Pick<AvailableFlight, 'availableFlightId' | 'contractType' | 'status' | 'legacyLegId' | 'seatsOffered' | 'departureTime' | 'externalId' | 'arrivalTime' | 'eft' | 'priceType'>
      & {
      aircraft?: Maybe<Pick<Aircraft, 'tailNumber' | 'modelName' | 'maxPax'>>, shuttlePricing?: Maybe<(
        Pick<ShuttlePricing, 'seatsOffered' | 'customerPrice' | 'operatorShare' | 'brokerShare' | 'brokerRate' | 'creditCardCost' | 'federalTaxCost' | 'segmentFeeCost' | 'seatPrice' | 'effective'>
        & { user?: Maybe<Pick<User, 'firstName' | 'lastName'>> }
        )>, charterPricing?: Maybe<(
        Pick<CharterPricing, 'customerPrice' | 'brokerShare' | 'brokerRate' | 'operatorShare' | 'federalTaxCost' | 'segmentFeeCost' | 'flightPrice' | 'effective'>
        & { user: Pick<User, 'firstName' | 'lastName'> }
        )>, bookings?: Maybe<Array<(
        Pick<Booking, 'lastUpdated' | 'passengerCount'>
        & { price: Pick<ShuttlePricing, 'customerPrice'> }
        )>>, passengers?: Maybe<Array<Pick<Passenger, 'legalName' | 'dateOfBirth' | 'weight'>>>, departureFbo?: Maybe<(
        Pick<Fbo, 'fboId' | 'phoneNumber' | 'name'>
        & { address?: Maybe<Pick<Address, 'line1' | 'line2' | 'city' | 'state' | 'country'>> }
        )>, arrivalFbo?: Maybe<(
        Pick<Fbo, 'fboId' | 'phoneNumber' | 'name'>
        & { address?: Maybe<Pick<Address, 'line1' | 'line2' | 'city' | 'state' | 'country'>> }
        )>, departureAirport?: Maybe<(
        Pick<Airport, 'code'>
        & { address?: Maybe<Pick<Address, 'line1' | 'line2' | 'city' | 'state' | 'country'>> }
        )>, arrivalAirport?: Maybe<(
        Pick<Airport, 'code'>
        & { address?: Maybe<Pick<Address, 'line1' | 'line2' | 'city' | 'state' | 'country'>> }
        )>, shuttlePriceHistory?: Maybe<Array<(
        Pick<ShuttlePricing, 'seatPrice' | 'effective' | 'seatsOffered'>
        & { user?: Maybe<Pick<User, 'firstName' | 'lastName'>> }
        )>>, charterPriceHistory?: Maybe<Array<(
        Pick<CharterPricing, 'effective' | 'flightPrice'>
        & { user: Pick<User, 'firstName' | 'lastName'> }
        )>>
    }
      )>
  }
};

export type ValidateEftQueryVariables = {
  input: FlightEstimateInput;
};


export type ValidateEftQuery = { estimateFlight?: Maybe<Pick<FlightEstimate, 'minimumEft' | 'maximumEft'>> };

export type ValidatePriceQueryVariables = {
  input: FlightEstimateInput;
};


export type ValidatePriceQuery = { estimateFlight?: Maybe<{ shuttlePricing?: Maybe<{ absoluteMinimum: Pick<ShuttlePricing, 'seatPrice'>, absoluteMaximum: Pick<ShuttlePricing, 'seatPrice'> }>, charterPricing?: Maybe<{ absoluteMinimum: Pick<CharterPricing, 'flightPrice'>, absoluteMaximum: Pick<CharterPricing, 'flightPrice'> }> }> };

export type FilteredFlightsQueryVariables = {
  filter?: Maybe<AvailableFlightFilterInput>;
  pagination?: Maybe<PaginationInput>;
};


export type FilteredFlightsQuery = {
  listAvailableFlights: {
    availableFlights: Array<(
      Pick<AvailableFlight, 'availableFlightId' | 'contractType' | 'status' | 'legacyLegId' | 'seatsOffered' | 'departureTime' | 'externalId'>
      & { aircraft?: Maybe<Pick<Aircraft, 'tailNumber' | 'modelName'>>, shuttlePricing?: Maybe<Pick<ShuttlePricing, 'seatPrice'>>, charterPricing?: Maybe<Pick<CharterPricing, 'flightPrice'>>, passengers?: Maybe<Array<Pick<Passenger, 'weight'>>>, departureFbo?: Maybe<Pick<Fbo, 'fboId' | 'name'>>, arrivalFbo?: Maybe<Pick<Fbo, 'fboId' | 'name'>>, departureAirport?: Maybe<Pick<Airport, 'code'>>, arrivalAirport?: Maybe<Pick<Airport, 'code'>> }
      )>, pagination?: Maybe<Pick<Pagination, 'count'>>
  }
};

export type GetAutoCompleteOptionsQueryVariables = {
  filter?: Maybe<AvailableFlightFilterInput>;
};


export type GetAutoCompleteOptionsQuery = {
  listAvailableFlights: {
    availableFlights: Array<(
      Pick<AvailableFlight, 'externalId'>
      & { aircraft?: Maybe<Pick<Aircraft, 'tailNumber'>> }
      )>
  }
};

export type UpdateFlightMutationVariables = {
  input: UpdateAvailableFlightInput;
};


export type UpdateFlightMutation = { updateAvailableFlight?: Maybe<Pick<AvailableFlight, 'availableFlightId'>> };

export type GetShuttlePriceDetailsQueryVariables = {
  input: PriceDetailsInput;
};


export type GetShuttlePriceDetailsQuery = { calculateSharedCharterPrice?: Maybe<Pick<ShuttlePricing, 'permitted' | 'customerPrice' | 'operatorShare' | 'brokerShare' | 'brokerRate' | 'creditCardCost' | 'federalTaxCost' | 'segmentFeeCost' | 'seatPrice'>> };

export type GetCharterPriceDetailsQueryVariables = {
  input: PriceDetailsInput;
};


export type GetCharterPriceDetailsQuery = { calculatePrivateCharterPrice?: Maybe<Pick<CharterPricing, 'customerPrice' | 'operatorShare' | 'brokerShare' | 'brokerRate' | 'federalTaxCost' | 'segmentFeeCost' | 'flightPrice'>> };
