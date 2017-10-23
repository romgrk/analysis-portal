/*
 * constants.js
 */

import { view, lensPath, converge, concat } from 'ramda';

import { getSampleStatus } from './models';

// Values start with a number for sorting
export const SAMPLE_STATUS = {
  RUNNING:      '0 - RUNNING',
  ERROR:        '1 - ERROR',
  WARNING:      '2 - WARNING',
  SUCCESS:      '4 - SUCCESS',
  UNDETERMINED: '3 - UNDETERMINED',
}

export const PROPERTIES = {
  lastUpdate: { name: 'Last Update', selector: view(lensPath(['modified'])) },
  id:         { name: 'ID',          selector: view(lensPath(['id'])) },
  user:       { name: 'User',        selector: view(lensPath(['user'])) },
  pipeline:   { name: 'Pipeline',    selector:
    converge((name, version) => [name, version].join(' '), [
      view(lensPath(['data', 'pipeline', 'name'])),
      view(lensPath(['data', 'pipeline', 'general_information', 'pipeline_version']))]) },
  status:     {
    name: 'Status',
    selector: getSampleStatus,
    options: toOptions(SAMPLE_STATUS)
  }
}

function toOptions(object) {
  const values = []
  Object.keys(object).forEach(key => {
    values.push({ text: key.toLowerCase(), value: object[key] })
  })
  return values
}
