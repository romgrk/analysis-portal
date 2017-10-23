/*
 * models.js
 */

import { SAMPLE_STATUS, PROPERTIES } from './constants';

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

    if (filters.status !== undefined
        && PROPERTIES.status.selector(sample) !== filters.status.value)
      return false

    return true
  })
}

export function getSampleStatus(sample) {
  const steps = sample.data.pipeline.step

  if (steps.some(step => step.job.some(isRunning)))
    return SAMPLE_STATUS.RUNNING

  if (steps.every(step => step.job.every(job => job.status === 'success')))
    return SAMPLE_STATUS.SUCCESS

  if (steps.some(step => step.job.some(job => job.status === 'error')))
    return SAMPLE_STATUS.ERROR

  if (steps.some(step => step.job.some(job => job.status === 'warning')))
    return SAMPLE_STATUS.WARNING

  return SAMPLE_STATUS.UNDETERMINED
}

function isRunning(job) {
  return ('job_start_date' in job) && !('job_end_date' in job)
}
