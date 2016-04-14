var UserGist = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            price: '',
            category:''
        };
    },

    componentDidMount: function() {
        console.log("componentDidMount - Called");
        console.log(this.props.source);
        this.serverRequest = $.get(this.props.source, function (result) {
            var lastGist = result[0];
            console.log("inside serverRequest");
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
  <UserGist source="./model/products.json" />,
  document.getElementById('react-container')
);

