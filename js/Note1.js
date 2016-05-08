var Note = React.createClass({
    
    render: function() {
        console.log("Inside Note");
        	return <div>Hello {this.props.text}, you are working at {this.props.children}</div>;
    	}

});

React.render(<Note text="Shinoy">ITC Infotech</Note>, 
    document.getElementById('react-container'));
