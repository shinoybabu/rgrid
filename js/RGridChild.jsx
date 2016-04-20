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

//-----------------RGrid-------------------------//

var RGrid = React.createClass({
	
	mixins: [SetIntervalMixin], 
		
	getInitialState: function () {
        return {
            Products: []
			,columns:[]
			,seconds: 0
			,currentTime :0
        };
    },

	componentDidMount: function() {
	    this.reloadData();  //Initialize data load
		this.bindColumns(); //Initialize Columns
		this.setInterval(this.tick, this.props.interval);
	},

	tick: function() {
	    this.setState({ seconds: this.state.seconds + 1 });
	    this.reloadData();
	},
	bindColumns: function(){
		var _columns = this.state.columns;
		this.props.children.map(function(children) {
		  _columns.push(children.props.field);		  
        });
		this.setState({ columns: _columns });
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
            <ProductTable 
				Products={this.state.Products} 		
				columns ={this.state.columns}		
				/>            
        </div>
        );
    }
});

//-----------------RGrid End-------------------------//

//-----------------ProductTable-------------------------//

var ProductTable = React.createClass({
	getInitialState: function() {
        return {
			NameSearch : '',
			GenderSearch : '',
			CompanySearch : ''
		}
    },

	ChangenameSearch : function(event){
		this.setState({NameSearch : event.target.value});
		},
	ChangegenderSearch : function(event){
		this.setState({GenderSearch : event.target.value});
		},
	ChangecompanySearch : function(event){
		this.setState({CompanySearch : event.target.value});
		},
	
	render: function() {
			var _NameSearch = this.state.NameSearch;
			var _GenderSearch = this.state.GenderSearch;
			var _CompanySearch = this.state.CompanySearch;
			var _Cols =this.props.columns;
			var rows = [];     
			var headers =[];
			var headerFilters =[];
			   
			this.props.Products.forEach(function(product) {       
			if (
				(product.name.toLowerCase().indexOf(_NameSearch.toLowerCase()) === -1 )
				||(product.gender.toLowerCase().indexOf(_GenderSearch.toLowerCase()) === -1 )
				||(product.company.toLowerCase().indexOf(_CompanySearch.toLowerCase()) === -1 )
			) { 
				return;
			  }
				rows.push(<ProductRow product={product} columns ={_Cols}/>);				      
			});	
			this.props.columns.forEach(function(column) { 
				headers.push(<th>{column}</th>);
			});
			
			this.props.columns.forEach(function(column) { 
				headerFilters.push(<th><input type="text" className="gridTextBox" onChange={this.ChangenameSearch} /></th>);
			});

			//<th><input type="text" className="gridTextBox" onChange={this.ChangenameSearch} /></th>
			//			<th><input type="text" className="gridTextBox" onChange={this.ChangegenderSearch} /></th>
			//			<th><input type="text" className="gridTextBox" onChange={this.ChangecompanySearch} /></th>
			//	<th></th> 

        return (
            <div>
              <table className="pure-table pure-table-bordered">
                <thead>
					<tr>
						{headers}  
					</tr>
					<tr>
						 {headerFilters}
					</tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>            
            </div>
        );
    }
});

//-----------------ProductTable Ends-------------------------//

//-----------------ProductRow-------------------------//
var ProductRow = React.createClass({
    render: function() {
		//var fields =[];
		//this.props.columns.forEach(function(column) { 
		//		fields.push(<th>{column}</th>);
		//	});

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

//-----------------ProductRow Ends-------------------------//

React.render(
	<RGrid  
		source="model/Users.json" 
		interval="10000" >
		<column field="name" />
		<column field="gender" />
		<column field="company" />
		<column field="photo" />
	</RGrid>,
  document.getElementById('react-container')
);
           