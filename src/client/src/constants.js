/*
 * constants.js
 */

import { view, lensPath } from 'ramda';

export const PROPERTIES = {
  lastUpdate: { name: 'Last Update', selector: view(lensPath(['modified'])) },
  user:       { name: 'User',        selector: view(lensPath(['user'])) },
  pipeline:   { name: 'Pipeline',    selector: view(lensPath(['data', 'pipeline', 'name'])) },
}

