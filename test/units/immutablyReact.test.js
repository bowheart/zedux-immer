import { immutablyReact } from '../../src/index'


describe('immutablyReact()', () => {

  test('returns a normal ZeduxReactor if the initialState is not an object or array', () => {

    const reactor = immutablyReact(1)

    expect(reactor(undefined, { type: 'a' })).toBe(1)

  })


  test('has the ZeduxReactor api', () => {

    const immutableReactor = immutablyReact({})

    expect(typeof immutableReactor).toBe('function')
    expect(typeof immutableReactor.process).toBe('function')
    expect(typeof immutableReactor.to).toBe('function')
    expect(typeof immutableReactor.toEverything).toBe('function')
    expect(typeof immutableReactor.withReducers).toBe('function')
    expect(typeof immutableReactor.withProcessors).toBe('function')

  })


  test('sub-reducers may mutate the draft without mutating the state', () => {

    const reactor = immutablyReact({ a: 0 })
      .to('a')
      .withReducers(state => state.a += 1)

    const initialState = reactor(undefined, { type: 'init' })
    const newState = reactor(initialState, { type: 'a' })

    expect(initialState).not.toBe(newState)
    expect(initialState.a).toBe(0)
    expect(newState.a).toBe(1)

  })


  test('nested mutation, just for fun', () => {

    const initialState = {
      a: {
        b: [ 1 ],
        c: {
          d: 2
        }
      }
    }
    const reactor = immutablyReact(initialState)
      .to('a')
      .withReducers(state => state.a.b.push(1))

    const newState = reactor(initialState, { type: 'a' })

    expect(newState).not.toBe(initialState)
    expect(initialState.a.c).toBe(newState.a.c)
    expect(initialState.a.b).toHaveLength(1)
    expect(newState.a.b).toHaveLength(2)
    expect(newState.a.b[1]).toBe(1)

  })


  test('top-level array mutation', () => {

    const reactor = immutablyReact([])
      .to('a')
      .withReducers(state => state.push(1))

    const initialState = reactor(undefined, { type: 'init' })
    const newState = reactor(initialState, { type: 'a' })

    expect(newState).not.toBe(initialState)
    expect(initialState).toHaveLength(0)
    expect(newState).toHaveLength(1)
    expect(newState[0]).toBe(1)

  })

})
