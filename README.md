# [DEPRECATED]

This repo has moved to [`Omnistac/zedux`](https://github.com/omnistac/zedux) - specifically the [`immer` package](https://github.com/omnistac/zedux/tree/master/packages/immer).

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

## Getting started

Well, there's not much to it. The entire documentation is contained in this readme.

To learn by getting dirty, you can poke around [this codepen](https://codepen.io/bowheart/pen/Gydyor?editors=0010).

To learn comprehensively, check out the [tests](https://github.com/bowheart/zedux-immer/tree/master/test).

## Method API

ZeduxImmer exposes just two functions:

- `immerizeReactor()` &ndash; wraps an existing reactor.
- `immutablyReact()` &ndash; creates a new, immutable reactor.

Let's look at each of these in more detail:

### `immerizeReactor()`

Wraps an existing [reactor](https://bowheart.github.io/zedux/docs/types/Reactor) in an immer [producer](https://github.com/mweststrate/immer#currying).

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
const todosStore = createStore().use(immerizedTodosReactor)

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

// Create an actor
const increment = act('increment')

// Create an immutable reactor
const counterReactor = immutablyReact({ counter: 0 })
  .to(increment)
  .withReducers(state => state.counter++) // a mutation >:)
```

Here's the above `immerizeReactor()` example using `immutablyReact()`

```javascript
import { immutablyReact } from 'zedux-immer'
import { act, createStore } from 'zedux'

// Create an actor
const addTodo = act('addTodo')

// Create an immutable reactor (as always, note the mutation)
const todosReactor = immutablyReact([])
  .to(addTodo)
  .withReducers((todos, newTodo) => todos.push(newTodo))

// Create the store
const todosStore = createStore().use(immerizedTodosReactor)

// And have a blast
todosStore.dispatch(addTodo('totally rock'))
todosStore.dispatch(addTodo('totally rock again'))
```

## Exploring further

Curried Immer producers can be used directly as Zedux [inducers](https://bowheart.github.io/zedux/docs/types/Inducer):

```javascript
import produce from 'immer'
import { createStore } from 'zedux'

// Create the store and hydrate its initial state
const store = createStore().hydrate({ counter: 0 })

// Create some Immerized inducers
const increment = produce(state => state.counter++)
const decrement = produce(state => state.counter--)

store.dispatch(increment)
store.dispatch(increment)
store.dispatch(decrement)

store.getState() // 1
```

## Contributing

All contributions are welcome. Just jump right in. Open an issue. PRs, just keep the coding style consistent and the tests at 100% (branches, functions, lines, everything 100%, plz). Be sure to run `npm run lint` and `npm test`. Happy coding!

Bugs can be submitted to https://github.com/bowheart/zedux-immer/issues

## License

The [MIT License](https://github.com/bowheart/zedux-immer/blob/master/LICENSE.md).
