import { Mode } from "~/types/practice";
import { getRandomNumberFromOne } from "./getRandomNumberFromOne";

export interface PracticeModeIndexGenerator {
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
    const index = this.indexToNotPassed(
      getRandomNumberFromOne(this.totalCount - this.passed.length),
    );

    if (this.totalCount - 1 === this.passed.length) {
      this.passed = [];
    }

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
      this.prev = randomNumber + (randomNumber >= this.prev ? 1 : 0);
      return this.prev;
    } else {
      this.prev = getRandomNumberFromOne(this.totalCount);
      return this.prev;
    }
  }
}

type PracticeModeIndexGeneratorConstructor = new (
  totalCount: number,
) => PracticeModeIndexGenerator;

export const practiceModeMap: Record<
  Mode,
  PracticeModeIndexGeneratorConstructor
> = {
  shuffle: shuffleMode,
  random: randomMode,
};
