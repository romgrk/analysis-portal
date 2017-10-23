/*
 * actions.js
 */

import {
  fetchAPI
} from './requests'
import { normalizeSamples } from './models';

export const SET_FILTER = 'SET_FILTER'
export const SET_ORDER = 'SET_ORDER'
export const SET_ORDER_DIRECTION = 'SET_ORDER_DIRECTION'

export const REQUEST_SAMPLES = 'REQUEST_SAMPLES'
export const RECEIVE_SAMPLES = 'RECEIVE_SAMPLES'


export function setFilter(which, value) {
  return {
    type: SET_FILTER,
    which,
    value
  }
}

export function setOrder(property) {
  return {
    type: SET_ORDER,
    property
  }
}

export function setOrderDirection(ascending) {
  return {
    type: SET_ORDER_DIRECTION,
    ascending
  }
}



export function requestSamples() {
  return {
    type: REQUEST_SAMPLES
  }
}

export function receiveSamples(samples) {
  return {
    type: RECEIVE_SAMPLES,
    samples
  }
}

export function fetchSamples() {
  return (dispatch, getState) => {
    const { samples } = getState()

    if (samples.isLoading)
      return

    dispatch(requestSamples())

    fetchAPI('/samples')
    .then(normalizeSamples)
    .then(samples => dispatch(receiveSamples(samples)))
    .catch(err => {
      dispatch(receiveSamples([]))
      console.error(err)
      // TODO handle failure
    })
  }
}
