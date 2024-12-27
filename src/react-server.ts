import { cache } from "react";

export const run = <F extends (...args: any[]) => any>(
  cb: F,
  ...args: Parameters<F>
): ReturnType<F> => {
  return cb(...args);
};

export { cache };
