var First = require('./first.jsx');
var Second = require('./second.jsx');

var HelloWorld = React.createClass({
  render: function() {
  var val = 1;
  var Text = val==1?First:Second;
    return (
    <div>
      <Text />

      </div>
    );
  }
});

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('example')
);
