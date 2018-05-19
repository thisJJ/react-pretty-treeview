'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _noParser = require('styled-components/no-parser');

var _noParser2 = _interopRequireDefault(_noParser);

var _lodash = require('lodash');

var _immutable = require('immutable');

var _TreeNodeCondition = require('./TreeNodeCondition');

var _TreeNodeCondition2 = _interopRequireDefault(_TreeNodeCondition);

var _TreeNodeComponent = require('./TreeNodeComponent');

var _TreeNodeComponent2 = _interopRequireDefault(_TreeNodeComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TreeView extends _react.Component {

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
          itemData: (0, _immutable.fromJS)(nextProps.data)
        });
      }
    };

    this.initialStateData = () => {
      const {
        data,
        activeName
      } = this.props;
      this.setState({
        itemData: (0, _immutable.fromJS)(data),
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

    this.createSourceTreeIndex = (getIndex, childName, state) => {
      const updateData = state.itemData;
      const getData = updateData.toJS();
      const treeSourceKey = getIndex.reduce((pre, cur) => {
        const resultData = (0, _lodash.get)(getData, pre.currentKey ? `${pre.currentKey}${childName}[${cur}].name` : '' + `[${cur}].name`, '');
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

      const getIndex = (0, _lodash.flattenDeep)(index);
      const data = this.state.itemData.toJS();
      const setData = this.createNewData(data, getIndex, childName);
      const itemData = this.state.itemData;

      const sourceTreeIndex = this.createSourceTreeIndex(getIndex, childName, this.state);

      this.setState({
        activeName: setData.name
      });

      const currentKeyData = sourceTreeIndex.currentKey.slice(0, -1);
      onSelected(setData, getIndex, setData.name, itemData, sourceTreeIndex.result, currentKeyData);
    };

    this.state = {
      activeName: null,
      clickName: '',
      itemData: (0, _immutable.fromJS)([])
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

    return _react2.default.createElement(
      'div',
      { className: 'tree-view-component' },
      _react2.default.createElement(
        'style',
        { jsx: true },
        `
         .tree-view-component{
           position: relative;
           display: block;
           clear:  both;
         }
         ul.tree-view-body{
           display: block;
           list-style: none;
           padding: 0px;
           margin: 0px;
         }
         
         span.tree-view-node{
           position: relative;
           list-style: none;
           display: block;
           padding-top: 10px;
         }
         ${treeStyle === '' ? `
           span.tree-view-node:first-child:before{
             content: '';
             width: 1px;
             height: 100%;
             position: absolute;
             left: -15px;
             top: 0px;
             background-color: #ddd;
           }
           span.tree-view-node:last-child:before{
             content: '';
             width: 1px;
             height: 0%;
             position: absolute;
             left: -15px;
             top: 0px;
             background-color: #ddd;
           }
           span.tree-view-node span{
             padding-top: 10px;
             margin-left: 30px;
             position: relative;
             list-style: none;
             display: block;
           }
         ` : treeStyle}
         ${labelStyle === '' ? `
           .tree-view-label{
             cursor: pointer;
             padding: 5px 15px;
             display: inline-block;
             position: relative;
             background-color: #eee;
           }
           .tree-view-label:hover{
             background: rgba(0,0,0,0.05);
           }
           .tree-view-label:before{
             content: '';
             width: 1px;
             height: 82%;
             position: absolute;
             left: -15px;
             top: -10px;
             background-color: #ddd;
           }
         
           .tree-view-label:after{
             content: '';
             width: 15px;
             height: 1px;
             position: absolute;
             left: -15px;
             top: 50%;
             background-color: #ddd;
           }
           .tree-view-label.active{
             background-color: #ddd;
             color: #333;
           }
           .tree-view-label.active:hover{
             background: #eee;
           }
           ` : labelStyle}
         `
      ),
      _react2.default.createElement(
        'ul',
        { className: 'tree-view-body' },
        _react2.default.createElement(_TreeNodeComponent2.default, {
          data: itemData,
          childsIndex: childsIndex,
          getTreeIndex: getTreeIndex,
          activeName: activeName,
          childName: childName,
          labelName: labelName
        })
      )
    );
  }
}
exports.default = TreeView;
TreeView.propTypes = {
  labelStyle: _propTypes2.default.string,
  treeStyle: _propTypes2.default.string,
  data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  childsIndex: _propTypes2.default.array,
  onSelected: _propTypes2.default.func,
  activeName: _propTypes2.default.string,
  childName: _propTypes2.default.string,
  labelName: _propTypes2.default.string
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