/*
 * Filters.js
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Dropdown,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import cx from 'classname';
import { compose, uniq } from 'ramda';

import { PROPERTIES } from '../constants.js';
import { setFilter } from '../actions.js';

const { keys } = Object

const mapStateToProps = state => ({
  samples: state.samples.list,
  filters: state.ui.filters,
})
const mapDispatchToProps = dispatch => ({
  setFilter: compose(dispatch, setFilter),
})

class Filters extends Component {
  render() {

    const { samples, filters, setFilter } = this.props

    const pipelineValues = uniq(samples.map(PROPERTIES.pipeline.selector))

    return (
      <div>

        <UncontrolledButtonDropdown className='dropdown--inline'>
          <DropdownToggle caret>
            { filters.pipeline || 'All' }
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setFilter('pipeline', undefined)}>All</DropdownItem>
            {
              pipelineValues.map(value => {
                return (
                  <DropdownItem key={value}
                    onClick={() => setFilter('pipeline', value)}>{ value }</DropdownItem>
                )
              })
            }

          </DropdownMenu>
        </UncontrolledButtonDropdown>

      </div>
    )
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
