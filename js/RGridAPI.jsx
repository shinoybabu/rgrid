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
	            //console.error(this.props.source, status, err.toString());
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
			Search:[]			
		}
    },

	componentWillReceiveProps: function() {
	//console.log("componentWillReceiveProps ")
		var _Search =[];
		if(this.state.Search.length <1)
		{
		//console.log("Reset the array")
		   this.props.columns.map(function(column) {
			  _Search.push('');	
			});
			this.setState({Search:_Search});
		}
		else{
		//console.log(this.state.Search)
		}
	},

	componentDidMount: function() {
	},

	render: function() {
		//console.log("ProductTable - render")
			//var _NameSearch = this.state.NameSearch;
			//var _GenderSearch = this.state.GenderSearch;
			//var _CompanySearch = this.state.CompanySearch;
			var _Search =[];			
			var _Cols =this.props.columns;
			var rows = [];     
			var headers =[];
			var headerFilters =[];
			var i = 0;
			var j = 0;
			var _SearchArrLength =this.state.Search.length;

			
			this.props.Products.forEach(function(product) {  
			
			//_SearchTemp.forEach(function(Sr) { 
			//	headers.push(<th>{column}</th>);
			//});
			     
			//if (
			//	(product.name.toLowerCase().indexOf(_NameSearch.toLowerCase()) === -1 )
			//	||(product.gender.toLowerCase().indexOf(_GenderSearch.toLowerCase()) === -1 )
			//	||(product.company.toLowerCase().indexOf(_CompanySearch.toLowerCase()) === -1 )
			//) { 
			//	return;
			  //}
				rows.push(<ProductRow product={product} columns ={_Cols}/>);				      
			});	


			_Cols.forEach(function(column) { 
				headers.push(<th>{column}</th>);
			});

			_Cols.map(function(column) { 
			//console.log("bind events")
				headerFilters.push(<th><input type="text" className="gridTextBox" id={i}
												onChange={function(event)
															{
															_Search[event.target.id-1]=event.target.value; 
															}
														} /></th>
									);									
			});
			
        return (
            <div>
              <table className="pure-table pure-table-bordered">
                <thead>
					<tr>
						{headers}  
					</tr>
					{/*<tr>
					{headerFilters}
					</tr>*/}
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
		var fields =[];
		var _Products = this.props.product;
		this.props.columns.forEach(function(column) { 
				fields.push(<td>{_Products[column]}</td>);
			});
        return (
          <tr>
            {fields}
          </tr>
        );
	}
});

//-----------------ProductRow Ends-------------------------//

React.render(
	<RGrid  
		source="http://binoy3-babu.rhcloud.com/rest/users" 
		interval="10000" >
		<column field="id" />
		<column field="name" displayName="User Name"/>
		<column field="age" />
		<column field="lastName" />
		<column field="job" />
	</RGrid>,
  document.getElementById('react-container')
);
           