export const run = <F extends (...args: any[]) => any>(
  cb: F,
  ...args: Parameters<F>
): ReturnType<F> => {
  return cb(...args);
};

export const cache: <F extends (...args: any[]) => any>(fn: F) => F = (fn) =>
  fn;
