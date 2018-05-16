"use strict";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { flattenDeep, get } from 'lodash';
import { fromJS } from 'immutable';

class TreeView extends Component {

  constructor(props) {
    super(props);

    this.componentDidMount = () => {
      this.initialStateData();
    };

    this.componentWillReceiveProps = nextProps => {

      const {
        activeName,
        data
      } = this.state;

      if (nextProps.activeName !== activeName) {
        this.setState({
          activeName: nextProps.activeName
        });
      }

      if (nextProps.data !== data) {
        this.setState({
          itemData: fromJS(nextProps.data)
        });
      }
    };

    this.initialStateData = () => {
      const {
        data,
        activeName
      } = this.props;
      this.setState({
        itemData: fromJS(data),
        activeName: activeName
      });
    };

    this.createNewData = (data, dataIndex, childName) => {
      let setData = data;
      for (let i = 0; i < dataIndex.length; i++) {
        if (i === 0) {
          setData = setData[dataIndex[i]];
        }
        if (i > 0) {
          setData = setData[`${childName}`][dataIndex[i]];
        }
      }
      return setData;
    };

    this.createSourceTreeIndex = (getIndex, childName) => {
      const updateData = this.state.itemData;
      const getData = updateData.toJS();
      const treeSourceKey = getIndex.reduce((pre, cur) => {
        const resultData = get(getData, pre.currentKey ? `${pre.currentKey}${childName}[${cur}].name` : '' + `[${cur}].name`, '');
        pre.result.push(resultData);
        pre.currentKey = pre.currentKey ? pre.currentKey + `${childName}[${cur}].` : `[${cur}].`;
        return pre;
      }, {
        result: [],
        currentKey: ''
      });

      return treeSourceKey;
    };

    this.getTreeIndex = index => {
      const {
        onSelected,
        childName
      } = this.props;

      const getIndex = flattenDeep(index);
      const data = this.state.itemData.toJS();
      const setData = this.createNewData(data, getIndex, childName);
      const itemData = this.state.itemData;

      const sourceTreeIndex = this.createSourceTreeIndex(getIndex, childName);

      this.setState({
        activeName: setData.name
      });

      const currentKeyData = sourceTreeIndex.currentKey.slice(0, -1);
      onSelected(setData, getIndex, setData.name, itemData, sourceTreeIndex.result, currentKeyData);
    };

    this.state = {
      activeName: null,
      clickName: '',
      itemData: fromJS([])
    };
  }

  render() {

    const {
      state: {
        itemData,
        activeName
      },
      getTreeIndex
    } = this;

    const {
      labelStyle,
      treeStyle,
      childsIndex,
      childName,
      labelName
    } = this.props;

    return React.createElement(
      TreeBody,
      null,
      React.createElement(TreeNodeComponent, {
        data: itemData,
        childsIndex: childsIndex,
        getTreeIndex: getTreeIndex,
        activeName: activeName,
        labelStyle: labelStyle,
        treeStyle: treeStyle,
        childName: childName,
        labelName: labelName
      })
    );
  }
}

TreeView.propTypes = {
  labelStyle: PropTypes.string,
  treeStyle: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  childsIndex: PropTypes.array,
  onSelected: PropTypes.func,
  activeName: PropTypes.string,
  childName: PropTypes.string,
  labelName: PropTypes.string
};
TreeView.defaultProps = {
  labelStyle: '',
  treeStyle: '',
  data: [],
  childsIndex: [],
  activeName: null,
  childName: 'childs',
  labelName: 'name'
};
const TreeBody = styled.ul`
  width: 320px;
  display: block;
  list-style: none;
  padding: 0px;
  margin: 0px;
`;

class TreeNodeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      childsIndex: []
    };
  }

  componentDidMount() {
    let newState = this.state;
    if (this.props.childsIndex !== []) newState.childsIndex.push(this.props.childsIndex);
    this.setState(newState);
  }

  render() {
    const getData = this.props.data;
    const {
      activeName,
      labelStyle,
      treeStyle,
      childName,
      labelName
    } = this.props;
    if (!getData) return null;
    return getData.map((data, key) => {

      return React.createElement(
        TreeNode,
        {
          key: key,
          treeStyle: treeStyle
        },
        React.createElement(TreeNodeCondition, {
          data: data,
          childsIndex: this.state.childsIndex,
          getTreeIndex: this.props.getTreeIndex,
          keyNode: key,
          activeName: activeName,
          labelStyle: labelStyle,
          labelName: labelName
        }),
        data.get(`${childName}`) && React.createElement(
          TreeChilds,
          { open: data.get('open', true) },
          React.createElement(TreeNodeComponent, {
            data: data.get(`${childName}`),
            getTreeIndex: this.props.getTreeIndex,
            childsIndex: this.state.childsIndex === [] ? [key] : [this.state.childsIndex, key],
            activeName: activeName,
            labelStyle: labelStyle,
            treeStyle: treeStyle,
            childName: childName,
            labelName: labelName
          })
        )
      );
    });
  }
}

TreeNodeComponent.propTypes = {
  childsIndex: PropTypes.array,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  getTreeIndex: PropTypes.func,
  activeName: PropTypes.string,
  labelStyle: PropTypes.string,
  treeStyle: PropTypes.string,
  childName: PropTypes.string,
  labelName: PropTypes.string
};
class TreeNodeCondition extends React.Component {

  constructor(props) {
    super(props);

    this.componentDidUpdate = nextProps => {
      const {
        data,
        labelName,
        keyNode,
        childsIndex
      } = this.props;
      if (this.state.checkUpdate === false) {
        if (get(nextProps, 'activeName', '') === data.get(`${labelName}`)) {
          this.handleChangeUpdate(true);
          this.props.getTreeIndex(childsIndex === [] ? [keyNode] : [childsIndex, keyNode]);
        }
      }
    };

    this.handleChangeUpdate = status => {
      this.setState({
        checkUpdate: status
      });
    };

    this.state = {
      checkUpdate: false
    };
  }

  render() {

    const {
      activeName,
      data,
      labelName,
      keyNode,
      labelStyle,
      childsIndex
    } = this.props;

    return React.createElement(
      TreeLabel,
      {
        onClick: () => this.props.getTreeIndex(childsIndex === [] ? [keyNode] : [childsIndex, keyNode]),
        active: activeName === data.get(`${labelName}`),
        labelStyle: labelStyle
      },
      data.get(`${labelName}`)
    );
  }

}

TreeNodeCondition.propTypes = {
  childsIndex: PropTypes.array,
  data: PropTypes.object,
  getTreeIndex: PropTypes.func,
  activeName: PropTypes.string,
  labelStyle: PropTypes.string,
  treeStyle: PropTypes.string,
  childName: PropTypes.string,
  labelName: PropTypes.string,
  keyNode: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
const TreeLabel = styled.div`
  cursor: pointer;
  padding: 5px 15px;
  display: inline-block;
  position: relative;
  background-color: #f9fcff;
	border: solid 1px #d0e7ff;
  margin-bottom: 10px;
  border-radius: 4px;
  :hover{
    background: rgba(0,0,0,0.05);
  }
  ${props => props.active === true && `
    background-color: #0b56a4;
    color: #fff;
    :hover{
      background: #043669;
    }
  `}
  ${props => props.labelStyle && props.labelStyle}

`;

const TreeChilds = styled.div`
  ${props => props.open === false && `
    display: none;
  `}
`;

const TreeNode = styled.span`
  position: relative;
  list-style: none;
  display: block;
  span{
    margin-left: 30px;
    position: relative;
    list-style: none;
    display: block;
    ${props => props.treeStyle && props.treeStyle}
  }
`;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TreeView