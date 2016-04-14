var UserGist = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            price: '',
            category:''
        };
    },

    componentDidMount: function() {
        this.serverRequest = $.get(this.props.source, function (result) {
            var lastGist = result[0];
            this.setState({
                name: lastGist.name,
                price: lastGist.price,
                category : lastGist.category
            });
        }.bind(this));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        return (
          <div>
            {this.state.name}s {this.state.price}here ID: {this.state.category}
        </div>
      );
    }
});

React.render(
  <UserGist source="http://shinoybabu.github.io/rgrid/model/products.json" />,
  document.getElementById('react-container')
);

