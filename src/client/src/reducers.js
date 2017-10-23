import { prop } from 'ramda';

import {
    REQUEST_SAMPLES
  , RECEIVE_SAMPLES
  , SET_FILTER
  , SET_ORDER
  , SET_ORDER_DIRECTION
} from './actions';
import { createDefaultUI, createDefaultSamples } from './models';


function uiReducer(state = createDefaultUI(), action, data) {
  switch (action.type) {
    case SET_FILTER: {
      return { ...state, filters: { ...state.filters, [action.which]: action.value } }
    }
    case SET_ORDER: {
      return { ...state, ordering: { ...state.ordering, property: action.property } }
    }
    case SET_ORDER_DIRECTION: {
      return { ...state, ordering: { ...state.ordering, ascending: action.ascending } }
    }
    default:
      return state;
  }
}

function samplesReducer(state = createDefaultSamples(), action, ui) {
  switch (action.type) {
    case REQUEST_SAMPLES: {
      return { ...state, isLoading: true }
    }
    case RECEIVE_SAMPLES: {
      return { ...state, isLoading: false, list: action.samples }
    }
    default:
      return state;
  }
}

export const rootReducer = (state = {}, action) => {
  const samples = samplesReducer(state.samples, action)
  const ui = uiReducer(state.ui, action)

  return { ui, samples }
}
