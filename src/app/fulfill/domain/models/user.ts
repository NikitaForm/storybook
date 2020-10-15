export class User {
  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _upn: string;
  private _emailAddress: string;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get emailAddress(): string {
    return this._emailAddress;
  }

  set emailAddress(emailAddress: string) {
    this._emailAddress = emailAddress;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get upn(): string {
    return this._upn;
  }

  set upn(value: string) {
    this._upn = value;
  }

  toString(): string {
    return `${this._firstName || ''} ${this._lastName || ''}`;
  }
}
