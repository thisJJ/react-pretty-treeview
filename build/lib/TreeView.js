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

    this.createSourceTreeIndex = (getIndex, childName) => {
      const updateData = this.state.itemData;
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
        _react2.default.createElement(TreeNodeComponent, {
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
class TreeNodeComponent extends _react2.default.Component {

  constructor(props) {
    super(props);

    this.componentDidMount = () => {
      let newState = this.state;
      if (this.props.childsIndex !== []) newState.childsIndex.push(this.props.childsIndex);
      this.setState(newState);
    };

    this.state = {
      childsIndex: []
    };
  }

  render() {
    const getData = this.props.data;
    const {
      activeName,
      childName,
      labelName
    } = this.props;
    if (!getData) return null;
    return getData.map((data, key) => {

      return _react2.default.createElement(
        'span',
        { className: 'tree-view-node',
          key: key
        },
        _react2.default.createElement(TreeNodeCondition, {
          data: data,
          childsIndex: this.state.childsIndex,
          getTreeIndex: this.props.getTreeIndex,
          keyNode: key,
          activeName: activeName,
          labelName: labelName
        }),
        data.get(`${childName}`) && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(TreeNodeComponent, {
            data: data.get(`${childName}`),
            getTreeIndex: this.props.getTreeIndex,
            childsIndex: this.state.childsIndex === [] ? [key] : [this.state.childsIndex, key],
            activeName: activeName,
            childName: childName,
            labelName: labelName
          })
        )
      );
    });
  }
}

TreeNodeComponent.propTypes = {
  childsIndex: _propTypes2.default.array,
  data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  getTreeIndex: _propTypes2.default.func,
  activeName: _propTypes2.default.string,
  childName: _propTypes2.default.string,
  labelName: _propTypes2.default.string
};
class TreeNodeCondition extends _react2.default.Component {

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
        if ((0, _lodash.get)(nextProps, 'activeName', '') === data.get(`${labelName}`)) {
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
      childsIndex
    } = this.props;

    return _react2.default.createElement(
      'div',
      { className: `tree-view-label ${activeName === data.get(`${labelName}`) && 'active'}`,
        onClick: () => this.props.getTreeIndex(childsIndex === [] ? [keyNode] : [childsIndex, keyNode])
      },
      data.get(`${labelName}`)
    );
  }

}
TreeNodeCondition.propTypes = {
  childsIndex: _propTypes2.default.array,
  data: _propTypes2.default.object,
  getTreeIndex: _propTypes2.default.func,
  activeName: _propTypes2.default.string,
  childName: _propTypes2.default.string,
  labelName: _propTypes2.default.string,
  keyNode: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};