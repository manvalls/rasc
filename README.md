# rasc

React's cache with added support for running outside of React.

## Installation

```bash
npm install rasc
```

## Usage

The library provides two main functions:

### cache()

A function decorator that caches results based on input parameters, similar to React's cache but also works outside React:

```
import { cache } from 'rasc'

const expensiveOperation = cache((input: string) => {
  // Result will be cached based on input
  return someExpensiveComputation(input)
})
```

### run()

Executes a function with a new cache context:

```
import { run } from 'rasc'

await run(async () => {
  // Cached functions inside this scope will share the same cache context
  await expensiveOperation('test')
})
```

## Features

- Compatible with React's cache mechanism
- Works outside of React components
- Supports both primitive and object arguments
- Memory-efficient caching using WeakMaps for object arguments
- TypeScript support
