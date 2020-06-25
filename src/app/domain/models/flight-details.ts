export class FlightRequestDetails {
    legDetails: any;
    percentageOfSalesPerSeat: number;
    total: number;
    requestTime: Date;
    passengerCount: number;
}

export class FlightPassengerDetails {
    dateOfBirth: string;
    legalName: string;
    passengerId: number;
    weight: number;
}

export class FlightRequestDetailsViewModel {
    legDetails: any;
    percentageOfSalesPerSeat: number;
    total: number;
    requestTime: Date;
    amount: number; // This is the amount of money the operator makes per each booking
    passengerCount: number;
}

export class FlightTotalAmountViewModel {
    // This is the total amount of money the operator maskes per each flight
    constructor(public total: number) { }
}

export class ArrivalTimeViewModel {
    constructor(public arrivalTime: Date) { }
}
