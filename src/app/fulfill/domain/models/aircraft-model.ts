export class AircraftModel {
  name: string;

  getName(): string {
    return this.name;
  }

  setName(name: string): AircraftModel {
    this.name = name;
    return this;
  }
}
