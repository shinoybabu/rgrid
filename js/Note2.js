var Note = React.createClass({
    
    getInitialState: function() {
        return {editing: true}
    },
    
    render: function() {
        if (this.state.editing) {
            return alert("true");
        }
        else {
            return alert("false");
        }
    }

});

React.render(<Note>ITC Infotech</Note>, 
    document.getElementById('react-container'));
