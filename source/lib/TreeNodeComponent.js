import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TreeNodeCondition from './TreeNodeCondition'
class TreeNodeComponent extends React.Component {

  static propTypes = {
    childsIndex: PropTypes.array,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    getTreeIndex: PropTypes.func,
    activeName: PropTypes.string,
    childName: PropTypes.string,
    labelName: PropTypes.string,
  }

  constructor(props){
    super(props)
    this.state = {
      childsIndex: []
    }
  }

  componentDidMount = () => {
    let newState = this.state
    if(this.props.childsIndex !== [])
      newState.childsIndex.push(this.props.childsIndex)
    this.setState(newState)
  }

  render() {
    const getData = this.props.data
    const {
      activeName,
      childName,
      labelName,
    } = this.props
    if (!getData) return null
    return getData.map((data, key) => {

      return (
        <span className="tree-view-node"
          key={ key }
        >
          <TreeNodeCondition
            data={ data }
            childsIndex={ this.state.childsIndex }
            getTreeIndex={ this.props.getTreeIndex }
            keyNode={ key }
            activeName={ activeName }
            labelName={ labelName }
          />
          {data.get(`${childName}`) && <div>
            <TreeNodeComponent
              data={ data.get(`${childName}`) }
              getTreeIndex={ this.props.getTreeIndex }
              childsIndex={ this.state.childsIndex === [] ? [key] : [this.state.childsIndex, key] }
              activeName={ activeName }
              childName={ childName }
              labelName={ labelName }
            />
          </div>}
        </span>
      )
    })
  }
}

export default TreeNodeComponent