import { isPlainObject } from '../../src/utils/general'

import { nonPlainObjects, plainObjects } from '../utils'


describe('isPlainObject()', () => {

  test('returns true if the given variable is a plain object', () => {

    plainObjects.forEach(
      plainObject => expect(isPlainObject(plainObject)).toBe(true)
    )

  })


  test('returns false if the given variable is not a plain object', () => {

    nonPlainObjects.forEach(
      nonPlainObject => expect(isPlainObject(nonPlainObject)).toBe(false)
    )

  })

})
