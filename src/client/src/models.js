/*
 * models.js
 */

import { PROPERTIES } from './constants';

const { keys, values } = Object


export function createDefaultUI() {
  return {
    ordering: {
      property: keys(PROPERTIES)[0],
      ascending: true
    },
    filters: {
    }
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

export function filterSamples(samples, filters) {
  return samples.filter(sample => {

    if (filters.pipeline !== undefined
        && PROPERTIES.pipeline.selector(sample) !== filters.pipeline)
      return false

    if (filters.user !== undefined
        && PROPERTIES.user.selector(sample) !== filters.user)
      return false

    return true
  })
}
