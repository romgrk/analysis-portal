import { prop } from 'ramda';

import {
    REQUEST_SAMPLES
  , RECEIVE_SAMPLES
  , SET_ORDER
} from './actions';
import { createDefaultUI, createDefaultSamples } from './models';


function uiReducer(state = createDefaultUI(), action, data) {
  switch (action.type) {
    case SET_ORDER: {
      return { ...state, ordering: action.property }
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
