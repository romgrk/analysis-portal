/*
 * constants.js
 */

import { view, lensPath, converge, concat } from 'ramda';

import { getSampleStatus } from './models';

export const PROPERTIES = {
  lastUpdate: { name: 'Last Update', selector: view(lensPath(['modified'])) },
  id:         { name: 'ID',          selector: view(lensPath(['id'])) },
  user:       { name: 'User',        selector: view(lensPath(['user'])) },
  pipeline:   { name: 'Pipeline',    selector:
    converge((name, version) => [name, version].join(' '), [
      view(lensPath(['data', 'pipeline', 'name'])),
      view(lensPath(['data', 'pipeline', 'general_information', 'pipeline_version']))]) },
  status:     { name: 'Status',      selector: getSampleStatus, values: ['success', 'warning', 'error', 'running', 'undetermined'] }
}

