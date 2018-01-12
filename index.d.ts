import { Reactor, ZeduxReactor } from 'zedux'


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
export function immerizeReactor<S = any>(reactor: Reactor<S>): Reactor<S>


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
export function immutablyReact<S = any>(initialState: S): ZeduxReactor<S>
