
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

var RGrid = React.createClass({
	mixins: [SetIntervalMixin], // Use the mixin	
	getInitialState: function () {
	    this.reloadData();
        return {
            products: [],
			seconds: 0
			,currentTime :0
        };
    },

	componentDidMount: function() {
	console.log("this.tick " + this.tick);
	this.setInterval(this.tick, this.props.interval);
	},

	tick: function() {
	    console.log("inside tick function");
	    this.setState({ seconds: this.state.seconds + 1 });
	    this.reloadData();
	},

	reloadData:function(){
	    $.ajax({
	        url: this.props.source,
	        dataType: 'json',
	        cache: false,
	        success: function (data) {
	            this.setState({ products: data });
	        }.bind(this),
	        error: function (xhr, status, err) {
	            console.error(this.props.source, status, err.toString());
	        }.bind(this)
	    });
	},

    render: function() {
        console.log("inside RGrid");
        return (
          <div className="myfeed">
            <SearchBar />
			 Rereshed the Data {this.state.seconds} times (every {this.props.interval/1000} seconds).<br/>
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
  <RGrid  source="http://shinoybabu.github.io/rgrid/model/products.json" currTime={new Date()} interval="5000"  />,
  document.getElementById('react-container')
);
           