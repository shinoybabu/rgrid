//For timer
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var FilterableProductTable = React.createClass({
	mixins: [SetIntervalMixin], // Use the mixin	      
    getInitialState: function() {
		this.serverRequest = $.get(this.props.source, function (result) {
            console.log("after serverRequest");
            var lastGist = result;
            this.setState({products:lastGist});
        }.bind(this));
        return {
            products: [{company: '', price: '', gender: '', name: ''}],
			seconds: 0
        };
    },

	componentDidMount: function() {
	console.log("this.tick " + this.tick);
	if(this.tick==0)
	{
    this.setInterval(this.tick, 1000); // Call a method on the mixin
	}
	else{this.setInterval(this.tick, 3000);}
	},

	tick: function() {
	console.log("inside tick function");
    this.setState({seconds: this.state.seconds + 1});

	this.serverRequest = $.get(this.props.source, function (result) {
            console.log("after serverRequest");
            var lastGist = result;
            this.setState({products:lastGist});
        }.bind(this));     

	},

    /*
    <input type="button" onClick={this.refreshData} src="../images/Button-Refresh-icon.png"></input>
	refreshData: function() {
        console.log("inside click");
        this.serverRequest = $.get(this.props.source, function (result) {
            console.log("after serverRequest");
            var lastGist = result;
            this.setState({products:lastGist});
        }.bind(this));     
    },*/

    render: function() {
        console.log("inside FilterableProductTable");
        return (
          <div className="myfeed">
            <SearchBar />
			 Rereshed the Data {this.state.seconds} times (every 3 minutes).<br/>
            <ProductTable products={this.state.products} />            
        </div>
        );
}
});

var ProductTable = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {            
            rows.push(<ProductRow product={product} key={product.name} category={product.category} />);
        lastCategory = product.category;
        });

        return (
            <div>
              <table className="pure-table pure-table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Company</th>  
                </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>            
            </div>
        );
    }
});

var ProductRow = React.createClass({
    render: function() {
        return (
          <tr>
            <td>{this.props.product.name}</td>
            <td>{this.props.product.gender}</td>
            <td>{this.props.product.company}</td>
          </tr>
        );
}
});


var SearchBar = React.createClass({
    render: function() {
        return (
          <form>
            <input type="text" placeholder="Search..." />
            <p>
              <input type="checkbox" />
              {' '}
        Only show products in stock
      </p>
    </form>
      );
    }
});



React.render(
  <FilterableProductTable  source="https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json"  />,
  document.getElementById('react-container')
);
           