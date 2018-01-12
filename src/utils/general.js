/**
  Checks whether thing is a plain old object.

  The object may originate from another realm or have its prototype
  explicitly set to Object.prototype, but it may not have a null
  prototype or prototype chain more than 1 layer deep.
*/
export function isPlainObject(thing) {
  if (typeof thing !== 'object' || !thing) return false

  let prototype = Object.getPrototypeOf(thing)
  if (!prototype) return false // it was created with Object.create(null)

  // If the prototype chain is exactly 1 layer deep, it's a normal object
  return Object.getPrototypeOf(prototype) === null
}
