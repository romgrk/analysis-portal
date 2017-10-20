/*
 * models.js
 */

import { PROPERTIES } from './constants';

const { keys, values } = Object


export function createDefaultUI() {
  return {
    ordering: keys(PROPERTIES)[0]
  }
}
export function createDefaultSamples() {
  return {
      isLoading: false
    , list: []
  }
}


export function normalizeSamples(samples) {
  samples.forEach(sample => {
    sample.created  = new Date(sample.created)
    sample.modified = new Date(sample.modified)
  })

  return samples
}

