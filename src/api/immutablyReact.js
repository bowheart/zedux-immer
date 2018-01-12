import produce from 'immer'
import { react } from 'zedux'

import { isPlainObject } from '../utils/general'


/**
  Creates an immutable ZeduxReactor.

  This ZeduxReactor's api is unchanged, but its reducer layer will receive
  the wrapping Immer producer's draft in place of the "state" param. This
  draft may be mutated at will.

  The processor layer will be unchanged.

  Will return a plain old reactor if initialState is not a plain object
  or array.

  @template S The shape of the state controlled by this reactor.

  @param initialState The initial state of the reactor. Must be a plain
    object or array for Immer to take effect.

  @returns {ZeduxReactor} The immutable reactor or a plain reactor if
    initialState is not a plain object or array.
*/
export function immutablyReact(initialState) {

  // No need for immer if the state isn't an object or array.
  if (!isPlainObject(initialState) && !Array.isArray(initialState)) {
    return react(initialState)
  }


  const reactor = react()


  // Use Immer's "curried" overload to wrap the reactor's reducer
  const producer = produce((state, action) => reactor(state, action))


  // This pseudo-reactor is what we'll actually return
  // He just feeds the Immer producer its initial state
  const mediator = (state = initialState, action) => producer(state, action)


  // Wrap the original reactor's methods on the mediator
  // Make them return the mediator for chaining.
  Object.entries(reactor).forEach(([ key, val ]) => {
    mediator[key] = (...args) => {
      val(...args)

      return mediator // for chaining
    }
  })


  return mediator
}
