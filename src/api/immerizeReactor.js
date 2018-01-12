import produce from 'immer'

import { isPlainObject } from '../utils/general'


const PROBE = '@@zedux-immer/probe'


/**
  Wraps the given reactor in an Immer producer.

  The reducer layer will receive the producer's draft in place
  of the "state" param. This draft may be mutated at will.

  The processor layer will be unchanged.

  Will do nothing and return the original reactor if the reactor's
  initial state is not a plain object or array.

  @template S The shape of the state controlled by this reactor.

  @param {Reactor} reactor The reactor to enhance.

  @returns {Reactor} The enhanced, immutable reactor or the passed
    reactor if the initial state is not a plain object or array.
*/
export function immerizeReactor(reactor) {

  // probe the reactor for its initialState
  const initialState = reactor(undefined, { type: PROBE })

  // No need for immer if the state isn't an object or array.
  if (!isPlainObject(initialState) && !Array.isArray(initialState)) {
    return reactor
  }


  // Use immer's "curried" overload to wrap the reactor's reducer
  const producer = produce((state, action) => reactor(state, action))


  // Create a "mediator" to tell the immer producer its initial state
  const mediator = (state = initialState, action) => producer(state, action)


  // Make the processor layer of this wrapper reactor transparent
  mediator.process = reactor.process


  return mediator
}
