import { immerizeReactor } from '../../src/index'


describe('immerizeReactor()', () => {

  test('does nothing and returns the original reactor if the initial state is not an object or array', () => {

    const reactor = (state = 1) => state

    const immerizedReactor = immerizeReactor(reactor)

    expect(immerizedReactor).toBe(reactor)

  })


  test('wraps the reactor\'s state so the reactor\'s sub-reducers can\'t modify it', () => {

    const reactor = (state = { a: 0 }, action) => {
      if (action.type !== 'a') return state

      state.a++
    }

    const immerizedReactor = immerizeReactor(reactor)

    const initialState = immerizedReactor(undefined, { type: 'init' })
    const newState = immerizedReactor(initialState, { type: 'a' })

    expect(newState).not.toBe(initialState)
    expect(initialState.a).toBe(0)
    expect(newState.a).toBe(1)

  })

})
