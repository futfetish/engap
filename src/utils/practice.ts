import { getRandomNumberFromOne } from "./getRandomNumberFromOne";

interface PracticeModeIndexGenerator {
  getNext: () => number;
}

export class shuffleMode implements PracticeModeIndexGenerator {
  private totalCount: number;
  private passed: number[] = [];

  constructor(totalCount: number) {
    this.totalCount = totalCount;
  }

  addToPassed(newElement: number) {
    for (let i = 0; i < this.passed.length; i++) {
      if (this.passed[i]! >= newElement) {
        this.passed.splice(i, 0, newElement);
        return;
      }
    }

    this.passed.push(newElement);
  }

  indexToNotPassed(index: number) {
    for (let i = 0; i < this.passed.length; i++) {
      if (this.passed[i]! <= index) {
        index++;
      }
    }

    return index;
  }

  getNext() {
    if (this.totalCount === this.passed.length) {
      this.passed = [];
    }

    const index = this.indexToNotPassed(
      getRandomNumberFromOne(this.totalCount - this.passed.length),
    );

    this.addToPassed(index);

    return index;
  }
}

export class randomMode implements PracticeModeIndexGenerator {
  private totalCount: number;
  private prev?: number;

  constructor(totalCount: number) {
    this.totalCount = totalCount;
  }

  getNext() {
    if (this.totalCount >= 2 && this.prev) {
      const randomNumber = getRandomNumberFromOne(this.totalCount - 1);

      return randomNumber + (randomNumber >= this.prev ? 1 : 0);
    } else {
      return getRandomNumberFromOne(this.totalCount);
    }
  }
}
