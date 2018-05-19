'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TreeNodeCondition = require('./TreeNodeCondition');

var _TreeNodeCondition2 = _interopRequireDefault(_TreeNodeCondition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        _react2.default.createElement(_TreeNodeCondition2.default, {
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
exports.default = TreeNodeComponent;