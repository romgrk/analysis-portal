/*
 * Filters.js
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import cx from 'classname';
import { compose } from 'ramda';

import { PROPERTIES } from '../constants.js';
import { setOrder } from '../actions.js';

const { keys } = Object

const mapStateToProps = state => ({
  currentOrder: state.ui.ordering
})
const mapDispatchToProps = dispatch => ({
  setOrder: compose(dispatch, setOrder)
})

class Order extends Component {
  render() {

    const { currentOrder, setOrder } = this.props

    const currentValue = PROPERTIES[currentOrder].name

    return (
      <UncontrolledDropdown className='dropdown--inline'>
        <DropdownToggle caret>
          { currentValue }
        </DropdownToggle>
        <DropdownMenu>
          {
            keys(PROPERTIES).map(which => {
              const property = PROPERTIES[which]
              return (
                <DropdownItem onClick={() => setOrder(which)}>{ property.name }</DropdownItem>
              )
            })
          }

        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
