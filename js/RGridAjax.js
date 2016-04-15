var FilterableProductTable = React.createClass({
    
    getInitialState: function() {
        return {
            products: [{company: '', price: '', gender: '', name: ''}]
        };
    },

    //componentDidMount: function() {
    //    console.log("inside componentDidMount"); 
    //    $('.myfeed').visibility({
    //        once: false,
        
    //        // update size when new content loads
    //        observeChanges: true,
        
    //        // load content on bottom edge visible
    //        onBottomVisible: function() {
    //            console.log("infiniateScroll ... called.");    
    //            alert("infiniateScroll ... called.");    
    //        }
    //    });
    //},

    refreshData: function() {
        console.log("inside click");
        this.serverRequest = $.get(this.props.source, function (result) {
            console.log("after serverRequest");
            var lastGist = result;
            this.setState({products:lastGist});
        }.bind(this));        
    },

    render: function() {
        console.log("inside FilterableProductTable");
        return (
          <div className="myfeed">
            <SearchBar />
            <input type="button" value="Refresh" onClick={this.refreshData}></input>
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
           