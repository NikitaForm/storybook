export class Status {
  private id: number;
  private name: string;

  getId(): number {
    return this.id;
  }

  setId(id: number): Status {
    this.id = id;

    return this;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): Status {
    this.name = name;

    return this;
  }
}
