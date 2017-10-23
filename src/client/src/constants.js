/*
 * constants.js
 */

import { view, lensPath, converge, concat } from 'ramda';

export const PROPERTIES = {
  lastUpdate: { name: 'Last Update', selector: view(lensPath(['modified'])) },
  id:         { name: 'ID',          selector: view(lensPath(['id'])) },
  user:       { name: 'User',        selector: view(lensPath(['user'])) },
  pipeline:   { name: 'Pipeline',    selector:
    converge((name, version) => [name, version].join(' '), [
      view(lensPath(['data', 'pipeline', 'name'])),
      view(lensPath(['data', 'pipeline', 'general_information', 'pipeline_version']))]) },
}

