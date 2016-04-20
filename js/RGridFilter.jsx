
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
        };
    },

	componentDidMount: function() {
	this.setInterval(this.tick, this.props.interval);
	},

	tick: function() {
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

    render: function() {
        return (
          <div>
			 Rereshed the Data {this.state.seconds} times (every {this.props.interval/1000} seconds).<br/>
            <ProductTable Products={this.state.Products} 
				filterText={this.state.filterText} 
				/>            
        </div>
        );
    }
});

var ProductTable = React.createClass({
	getInitialState: function() {
        return {
			NameSearch : '',
			GenderSearch : '',
			CompanySearch : ''
		}
    },

	ChangeNameSearch : function(event){
		this.setState({NameSearch : event.target.value});
		},
	ChangeGenderSearch : function(event){
		this.setState({GenderSearch : event.target.value});
		},
	ChangeCompanySearch : function(event){
		this.setState({CompanySearch : event.target.value});
		},
	
	render: function() {
			var _NameSearch = this.state.NameSearch;
			var _GenderSearch = this.state.GenderSearch;
			var _CompanySearch = this.state.CompanySearch;
			var rows = [];        
			this.props.Products.forEach(function(product) {       
			if (
				(product.name.toLowerCase().indexOf(_NameSearch.toLowerCase()) === -1 )
				||(product.gender.toLowerCase().indexOf(_GenderSearch.toLowerCase()) === -1 )
				||(product.company.toLowerCase().indexOf(_CompanySearch.toLowerCase()) === -1 )
			) { 
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
					<tr>
						<th><input type="text" ref="refTxtName" className="gridTextBox" onChange={this.ChangeNameSearch} /></th>
						<th><input type="text" ref="refTxtGender" className="gridTextBox" onChange={this.ChangeGenderSearch} /></th>
						<th><input type="text" ref="refTxtCompany" className="gridTextBox" onChange={this.ChangeCompanySearch} /></th>
						<th></th>  
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

React.render(
  <RGrid  
	source="model/Users.json" 
	interval="1000"  />,
  document.getElementById('react-container')
);
           