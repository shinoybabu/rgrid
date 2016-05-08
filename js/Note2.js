var Note = React.createClass({
    
    getInitialState: function() {
        console.log("inside getInitialState");
        return {editing: false}
    },
    
    render: function() {
        console.log("render");
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
