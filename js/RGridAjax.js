var FilterableProductTable = React.createClass({
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
                name: lastGist.owner.login,
                price: lastGist.html_url,
                category : lastGist.owner.id
            });
        }.bind(this));
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },



    render: function() {
        return (
          <div>
            <SearchBar />
            <ProductTable products={this.state.lastGist} />
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

var style1 = {
    //color: 'black'    
};
return (
  <table style={style1} className="pure-table pure-table-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Category</th>  
    </tr>
    </thead>
    <tbody>{rows}</tbody>
  </table>
        );
}
});

var ProductRow = React.createClass({
    render: function() {
        var name = this.props.product.stocked ?
          this.props.product.name :
              <span style={{color: 'red'}}>
              {this.props.product.name}
            </span>;
        return (
          <tr>
            <td>{name}</td>
            <td>{this.props.product.price}</td>
            <td>{this.props.product.category}</td>
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



var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
 
React.render(
  <FilterableProductTable products={PRODUCTS} source="https://api.github.com/users/octocat/gists"  />,
  document.getElementById('react-container')
);

