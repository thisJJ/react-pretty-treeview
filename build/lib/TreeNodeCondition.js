'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      _react2.default.createElement(
        'div',
        { className: 'tree-view-colleb' },
        data.get(`${labelName}`)
      )
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
exports.default = TreeNodeCondition;