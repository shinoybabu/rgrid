
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
            Products: []
			,seconds: 0
			,currentTime :0
			,filterText: ''
			,inStockOnly: false
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
	            this.setState({ Products: data });
	        }.bind(this),
	        error: function (xhr, status, err) {
	            console.error(this.props.source, status, err.toString());
	        }.bind(this)
	    });		
	},

	  handleUserInput: function(filterText) {
	  console.log("inside handleUserInput");
	  console.log(filterText);
		this.setState({
		  filterText: filterText
		});
		console.log(filterText);
	  },

    render: function() {
        console.log("inside RGrid");
        return (
          <div className="myfeed">
            <SearchBar
			  filterText={this.state.filterText}
			  onUserInput={this.handleUserInput}
			/>
			 Rereshed the Data {this.state.seconds} times (every {this.props.interval/1000} seconds).<br/>
            <ProductTable Products={this.state.Products} 
				filterText={this.state.filterText} 
				/>            
        </div>
        );
    }
});

var ProductTable = React.createClass({
    render: function() {
	var _filterText = this.props.filterText	
        var rows = [];        
        this.props.Products.forEach(function(product) {       
		console.log("inside ProductTable method for each");     
           // rows.push(<ProductRow product={product}/>);
			if (product.name.indexOf(_filterText) === -1 ) {  //this.props.filterText
				return;
			  }
			  rows.push(<ProductRow product={product}/>);
        });

        return (
            <div>
              <table className="pure-table pure-table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Company</th>  
                    <th>Photo</th>  
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
            <td><image src={this.props.product.photo} alt={this.props.product.name} className='photo'></image></td>
          </tr>
        );
}
});


var SearchBar = React.createClass({ 
  
  handleChange: function() {
  console.log("inside SearchBar");
  console.log(this.refs.filterTextInputRef.value);
    this.props.onUserInput(
      this.refs.filterTextInputRef.value
    );
  },

  render: function() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          ref="filterTextInputRef"
          onChange={this.handleChange}
        />
      </form>
    );
  }
});



React.render(
  <RGrid  source="http://shinoybabu.github.io/rgrid/model/Users.json" currTime={new Date()} interval="50000"  />,
  document.getElementById('react-container')
);
           