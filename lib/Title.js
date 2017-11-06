'use strict';

exports.__esModule = true;
exports.flushTitle = flushTitle;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var titles = [];

function getTitle() {
  return titles[titles.length - 1];
}

function updateTitle() {
  document.title = getTitle();
}

function flushTitle() {
  var title = getTitle();
  titles = [];
  return title;
}

var oneOfType = _propTypes2['default'].oneOfType;
var string = _propTypes2['default'].string;
var func = _propTypes2['default'].func;

var Title = _react2['default'].createClass({
  displayName: 'Title',

  propTypes: {
    render: oneOfType([string, func]).isRequired
  },

  getInitialState: function getInitialState() {
    return {
      index: titles.push('') - 1
    };
  },

  componentWillUnmount: function componentWillUnmount() {
    titles.pop();
  },

  componentDidMount: updateTitle,

  componentDidUpdate: updateTitle,

  render: function render() {
    var render = this.props.render;

    titles[this.state.index] = typeof render === 'function' ? render(titles[this.state.index - 1] || '') : render;
    return this.props.children || null;
  }

});

exports['default'] = Title;