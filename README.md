# Zedux Immer

[![Build Status](https://travis-ci.org/bowheart/zedux-immer.svg?branch=master)](https://travis-ci.org/bowheart/zedux-immer)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0459ebf8444c36752eac/test_coverage)](https://codeclimate.com/github/bowheart/zedux-immer/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/0459ebf8444c36752eac/maintainability)](https://codeclimate.com/github/bowheart/zedux-immer/maintainability)
[![npm](https://img.shields.io/npm/v/zedux-immer.svg)](https://www.npmjs.com/package/zedux-immer)

Official [Immer](https://github.com/mweststrate/immer) bindings for [Zedux](https://github.com/bowheart/zedux). Because Zedux + Immer = Awesome.

Provides a few simple, standard helper methods for wrapping Zedux reactors in Immer producers.

## Installation

Install using npm:

```bash
npm install --save zedux-immer
```

Or yarn:

```bash
yarn add zedux-immer
```

Or include the appropriate unpkg build on your page:

### Development

```html
<script src="https://unpkg.com/zedux-immer/dist/zedux-immer.js"></script>
```

### Production

```html
<script src="https://unpkg.com/zedux-immer/dist/zedux-immer.min.js"></script>
```

## Method API

ZeduxImmer exposes just two methods:

- `immerizeReactor()` &ndash; wraps an existing reactor.
- `immutablyReact()` &ndash; creates a new, immutable reactor.

Let's look at each of these in more detail:

### `immerizeReactor()`

Wraps an existing [reactor](https://bowheart.github.io/zedux/docs/types/Reactor.html) in an immer [producer](https://github.com/mweststrate/immer#currying).

This is just a higher-order reactor. Its reducer layer will pass the Immer draft on to the wrapped reactor. Its processor layer is transparent.

#### Examples

At a high level:

```javascript
import { immerizeReactor } from 'zedux-immer'
import reactor from './reactor'

const immerizedReactor = immerizeReactor(reactor)
```

A not-so-contrived example:

```javascript
import { immerizeReactor } from 'zedux-immer'
import { act, createStore, react } from 'zedux'

// Create an actor
const addTodo = act('addTodo')

// Create a reactor (note the mutation! :O)
const todosReactor = react([])
  .to(addTodo)
  .withReducers((todos, newTodo) => todos.push(newTodo))

// Immerize the reactor
const immerizedTodosReactor = immerizeReactor(todosReactor)

// Create the store
const todosStore = createStore()
  .use(immerizedTodosReactor)

// And have a blast
todosStore.dispatch(addTodo('totally rock'))
todosStore.dispatch(addTodo('totally rock again'))
```

### `immutablyReact()`

Creates an immutable [ZeduxReactor](https://bowheart.github.io/zedux/docs/api/ZeduxReactor.html). As such, its api is exactly the same as the ZeduxReactor api.

This is just a convenience &ndash; With `immerizeReactor()` we have to create the reactor then wrap it in an Immer producer. With `immutablyReact()` we create and wrap the reactor in a single step.

#### Examples

At a high level:

```javascript
import { act } from 'zedux'
import { immutablyReact } from 'zedux-immer'

const increment = act('increment')

const counterReactor = immutablyReact({ counter: 0 })
  .to(increment)
  .withReducers(state => state.counter++)
```

Here's the above `immerizeReactor()` example using `immutablyReact()`

```javascript
import { immutablyReact } from 'zedux-immer'
import { act, createStore } from 'zedux'

// Create an actor
const addTodo = act('addTodo')

// Create an immutable reactor (note the mutation! :O)
const todosReactor = immutablyReact([])
  .to(addTodo)
  .withReducers((todos, newTodo) => todos.push(newTodo))

// Create the store
const todosStore = createStore()
  .use(immerizedTodosReactor)

// And have a blast
todosStore.dispatch(addTodo('totally rock'))
todosStore.dispatch(addTodo('totally rock again'))
```

## Contributing

All contributions are welcome. Just jump right in. Open an issue. PRs, just keep the coding style consistent and the tests at 100% (branches, functions, lines, everything 100%, plz). Be sure to run `npm lint` and `npm test`. Happy coding!

Bugs can be submitted to https://github.com/bowheart/zedux/issues

## License

The MIT License.
