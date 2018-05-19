import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  get,
} from 'lodash'
class TreeNodeCondition extends React.Component {
  static propTypes = {
    childsIndex: PropTypes.array,
    data: PropTypes.object,
    getTreeIndex: PropTypes.func,
    activeName: PropTypes.string,
    childName: PropTypes.string,
    labelName: PropTypes.string,
    keyNode: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  constructor(props){
    super(props)
    this.state = {
      checkUpdate: false,
    }
  }
  
  componentDidUpdate = (nextProps) => {
    const {
      data,
      labelName,
      keyNode,
      childsIndex,
    } = this.props
    if(this.state.checkUpdate === false){
      if(get(nextProps, 'activeName', '') === data.get(`${labelName}`)){
        this.handleChangeUpdate(true)
        this.props.getTreeIndex(childsIndex === [] ? [keyNode] : [childsIndex, keyNode])
      }
    }
  }

  handleChangeUpdate = (status) => {
    this.setState({
      checkUpdate: status
    })
  }

  render(){

    const {
      activeName,
      data,
      labelName,
      keyNode,
      childsIndex,
    } = this.props

    return (
      <div className={`tree-view-label ${activeName === data.get(`${labelName}`) && 'active'}`}
        onClick={ ()=> this.props.getTreeIndex(childsIndex === [] ? [keyNode] : [childsIndex, keyNode]) }
      >
        <div className="tree-view-colleb">{ data.get(`${labelName}`) }</div>
      </div>
    )
  }
}

export default TreeNodeCondition