export const delay = async (seconds: number) =>
  new Promise((r) => setTimeout(r, seconds * 1000));
