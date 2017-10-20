import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { compose } from 'ramda';

import Order from './Order.js';
import Samples from './Samples.js';

const { keys, values, entries } = Object





const mapStateToProps = state => ({
    isLoading: state.samples.isLoading
  , samples: state.samples.list
})
const mapDispatchToProps = dispatch => ({
})
class App extends Component {

  render() {

    const { samples } = this.props

    return (
      <div className='App'>

        <div className='App__row'>
          <div className='group'>
            <span className='label'>Order by </span> <Order />
          </div>
        </div>

        <Samples />

      </div>
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
