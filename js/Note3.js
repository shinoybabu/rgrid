var Note = React.createClass({
    
    getInitialState: function() {
        return {editing: true}
    },

//when ever change any state it will call the render function and update the state

    clicked1: function() {
        this.setState({editing: false});
    },
    clicked2: function() {
        this.setState({editing: true});
    },

    render: function() {
        if (this.state.editing) {
            return (		
		<input type="button" value="click me1" onClick={this.clicked1}></input>
		);
        }
        else {
            return (<input type="button" value="click me2" onClick={this.clicked2}></input>)
        }
    }

});

React.render(<Note>ITC Infotech</Note>, 
    document.getElementById('react-container'));
