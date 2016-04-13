var _rows = [];
for (var i = 1; i < 1000; i++) {
    _rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
    });
}

var UserGist = React.createClass({

    getInitialState: function() {
        return {
            id: '', title: '', count:''
        };
    },

    componentDidMount: function() {           
        var FirstRow = rowGetter(1);
            this.setState({
                id: FirstRow.id,
                title: FirstRow.title,
                count : FirstRow.count
            });       
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        return (
          <div>
            {this.state.id}'s title {this.state.title} and count {this.state.count}
        </div>
      );
    }
});

var rowGetter = function(i){
  return _rows[i];
};

React.render(<UserGist />, 
    document.getElementById('react-container'));
