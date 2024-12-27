import { cache as reactCache } from "react";
import { AsyncLocalStorage } from "async_hooks";

type CacheNode = {
  value: any;
  children: Map<any, CacheNode>;
  weakChildren: WeakMap<any, CacheNode>;
};

const asyncLocalStorage = new AsyncLocalStorage<WeakMap<Function, CacheNode>>();

export const run = <F extends (...args: any[]) => any>(
  cb: F,
  ...args: Parameters<F>
): ReturnType<F> => {
  return asyncLocalStorage.run(new WeakMap(), () => cb(...args));
};

export const cache = <F extends (...args: any[]) => any>(fn: F): F => {
  const reactCachedFn = reactCache(fn);

  const cachedFn: any = (...args: Parameters<typeof fn>): ReturnType<F> => {
    const map = asyncLocalStorage.getStore();
    if (!map) {
      return reactCachedFn(...args);
    }

    let node: CacheNode = map.get(fn) ?? {
      value: undefined,
      children: new Map(),
      weakChildren: new WeakMap(),
    };

    map.set(fn, node);

    for (const arg of args) {
      const isWeak = typeof arg === "object" && arg !== null;
      const nextNode: CacheNode = (isWeak
        ? node.weakChildren.get(arg)
        : node.children.get(arg)) ?? {
        value: undefined,
        children: new Map(),
        weakChildren: new WeakMap(),
      };

      if (isWeak) {
        node.weakChildren.set(arg, nextNode);
      } else {
        node.children.set(arg, nextNode);
      }

      node = nextNode;
    }

    if (node.value === undefined) {
      node.value = reactCachedFn(...args);
    }

    return node.value;
  };

  return cachedFn;
};
