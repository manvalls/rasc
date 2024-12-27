declare module "react" {
  /**
   * Creates a memoized version of a function.
   * The function will only execute once for each unique set of arguments.
   * The result will be cached for subsequent calls with the same arguments.
   */
  export const cache: <T extends (...args: any[]) => any>(fn: T) => T;
}
