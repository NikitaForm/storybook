export class Operator {
  operatorId: string = null;
  name: string = null;

  getOperatorId(): string {
    return this.operatorId;
  }

  setOperatorId(operatorId: string): Operator {
    this.operatorId = operatorId;

    return this;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): Operator {
    this.name = name;

    return this;
  }

  equals(o1: Operator): boolean {

    if (!o1) {
      return false;
    }

    return this.operatorId === o1.operatorId;
  }
}
