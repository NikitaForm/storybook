export class AircraftCategory {
  id: number;
  name: string;

  getId(): number {
    return this.id;
  }

  setId(id: number): AircraftCategory {
    this.id = id;

    return this;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): AircraftCategory {
    this.name = name;

    return this;
  }

  equals(o1: AircraftCategory): boolean {
    if (o1 === null || this.id === null || this.id === undefined) {
      return false;
    }

    return this.id === o1.id;
  }
}
