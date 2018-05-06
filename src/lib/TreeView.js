import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { flattenDeep, tail, first, join, get } from 'lodash'
class TreeView extends Component {

  static propTypes = {
    labelStyle: PropTypes.string,
    treeStyle: PropTypes.string,
    data: PropTypes.array,
    childsIndex: PropTypes.array,
    onSelected: PropTypes.func,
  }

  static defaultProps = {
    labelStyle: '',
    treeStyle: '',
    data: [],
    childsIndex: [],
  }

  constructor(props){
    super(props)
    this.state = {
      activeName: null,
      clickName: '',
      itemData: []
    }
  }

  componentDidMount = () => {
    this.initialStateData()
  }

  initialStateData = () => {
    const { data } = this.props
    this.setState({
      itemData: data
    })
  }

  getTreeIndex = (index) => {
    const { onSelected } = this.props
    const getindex = flattenDeep(index)
    // console.log('setIndex', getindex)
    let setData = this.state.itemData
    const updateData = this.state.itemData
    for(let i = 0; i < getindex.length; i++){
      if(i === 0){
        setData = setData[getindex[i]]
      }
      if(i > 0){
        setData = setData.childs[getindex[i]]
      }
    }
    const setIndex = join(tail(getindex).map((d) => {
      return `.childs[${d}]`
    }), '')
    console.log('first(getindex)',first(getindex))
    console.log('setIndex', get(updateData,`[${first(getindex)}]${setIndex}`))
    console.log('setData', setData)
    this.setState({
      activeName: setData.name,
      itemData: updateData,
    })
    onSelected(getindex, setData.name, setData, updateData)
  }

  render(){

    const {
      state: {
        itemData,
        activeName
      },
      getTreeIndex,
    } = this

    const {
      labelStyle,
      treeStyle,
      childsIndex,
    } = this.props

    return(
      <TreeBody>
        <TreeNodeComponent
          data={ itemData }
          childsIndex={ childsIndex }
          getTreeIndex={ getTreeIndex }
          activeName={ activeName }
          labelStyle={ labelStyle }
          treeStyle={ treeStyle }
        />
      </TreeBody>
    )
  }
}

export default TreeView

const TreeBody = styled.ul`
  width: 320px;
  display: block;
  list-style: none;
  padding: 0px;
  margin: 0px;
`

class TreeNodeComponent extends React.Component {

  static propTypes = {
    childsIndex: PropTypes.array,
    data: PropTypes.array,
    getTreeIndex: PropTypes.func,
    activeName: PropTypes.string,
    labelStyle: PropTypes.string,
    treeStyle: PropTypes.string,
  }

  constructor(props){
    super(props)
    this.state = {
      childsIndex: []
    }
  }

  componentDidMount() {
    let newState = this.state
    if(this.props.childsIndex !== [])
      newState.childsIndex.push(this.props.childsIndex)
    this.setState(newState)
  }

  render() {
    const getData = this.props.data
    const {
      activeName,
      labelStyle,
      treeStyle,
    } = this.props
    if (!getData) return null
    return getData.map((data, key) => {
      return (
        <TreeNode
          key={ key }
          treeStyle={ treeStyle }
        >
          <TreeLabel
            onClick={ ()=> this.props.getTreeIndex(this.state.childsIndex === [] ? [key] : [this.state.childsIndex, key]) }
            active={ activeName === data.name }
            labelStyle={ labelStyle }
          >
            { data.name }
          </TreeLabel>
          {data.childs && <TreeChilds open={ data.open }>
            <TreeNodeComponent
              data={ data.childs }
              getTreeIndex={ this.props.getTreeIndex }
              childsIndex={ this.state.childsIndex === [] ? [key] : [this.state.childsIndex, key] }
              activeName={ activeName }
              labelStyle={ labelStyle }
              treeStyle={ treeStyle }
            />
          </TreeChilds>}
        </TreeNode>
      )
    })
  }
}


const TreeLabel = styled.div`
  cursor: pointer;
  padding: 5px 15px;
  display: inline-block;
  position: relative;
  background-color: #f9fcff;
	border: solid 1px #d0e7ff;
  margin-bottom: 10px;
  border-radius: 4px;

  ${ props => props.active === true && `
    background-color: #0b56a4;
    color: #fff;
  `}

  ${ props => props.labelStyle && props.labelStyle }
`

const TreeChilds = styled.div`
  ${props => props.open === false && `
    display: none;
  `}
`

const TreeNode = styled.span`
  position: relative;
  list-style: none;
  display: block;
  span{
    margin-left: 30px;
    position: relative;
    list-style: none;
    display: block;
    ${ props => props.treeStyle && props.treeStyle }
  }
`