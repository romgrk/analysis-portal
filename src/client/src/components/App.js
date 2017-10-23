import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { compose, identity, reverse } from 'ramda';

import { PROPERTIES } from '../constants.js';
import { filterSamples } from '../models.js';
import smartSort from '../helpers/smartSort.js';
import Order from './Order.js';
import Filters from './Filters.js';
import Samples from './Samples.js';

const { keys, values, entries } = Object





const mapStateToProps = state => ({
    isLoading: state.samples.isLoading
  , samples: state.samples.list
  , selector: PROPERTIES[state.ui.ordering.property].selector
  , ascending: state.ui.ordering.ascending
  , filters: state.ui.filters
})
const mapDispatchToProps = dispatch => ({
})
class App extends Component {

  render() {

    const { samples, filters, selector, ascending } = this.props

    const filteredSamples = filterSamples(samples, filters)

    const sortedSamples =
      (ascending ? identity : reverse)
      ([...filteredSamples].sort((a, b) =>
        smartSort(selector(a), selector(b))))

    return (
      <div className='App'>

        <div className='App__row'>
          <div className='group'>
            <Order />
          </div>
          <div className='group'>
            <Filters />
          </div>
        </div>

        <Samples samples={sortedSamples} />

      </div>
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
