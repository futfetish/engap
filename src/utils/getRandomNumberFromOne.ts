export const  getRandomNumberFromOne = (n: number): number => {
    const randomNumber = Math.floor(Math.random() * n);n
    return randomNumber + 1;
  }