import React, { Component } from 'react';
import PropTypes from "prop-types";
import ReactDOM, { render } from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default class AnimatedShoppingList extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            items: [
                {id: 1, name: 'Milk'},
                {id:2, name: 'Yogurt'},
                {id:3, name: 'Orange Juice'}
            ],
            newItem : ""
        };
    }

    //Called when the user changes the input field.
    handleChange(evt) {
        if(evt.key === 'Enter'){
            //Create a new item and set the current time as it's id
            let newItem = {id: Date.now(), name: evt.target.value};

            //crate a new array with the previous items plus the value the user typed
            let newItems = this.state.items.concat(newItem);

            //set the new state
            this.setState({items: newItems, newItem: ""});
        }
    }


    //Called when the user clicks on a shopping item.
    handleRemove(i){
        //Create a new array without the clicked item
        let newItems = Object.assign([], this.state.items);
        newItems.splice(i, 1);

        //set the new state
        this.setState({items: newItems});
    }

    changeInput(evt){
        let text = evt.target.value;
        this.setState({newItem: text});
    }

    render() {
        let shoppingItems = this.state.items.map((item, i) => {
                return (
                    <CSSTransition classNames="example"
                        timeout={300}
                        unmountOnExit
                        key={item.id}>
                            <div className="item" onClick={this.handleRemove.bind(this, i)}>{item.name}</div>                
                </CSSTransition>
            );
        });

        return (
            <div>
                <TransitionGroup>                    
                    {shoppingItems}
                </TransitionGroup>
                <input type="text" value={this.state.newItem} 
                    onKeyDown={this.handleChange.bind(this)}
                    onChange={this.changeInput.bind(this)}
                    placeholder="Enter an item" />
            </div>
        );
    }
}

AnimatedShoppingList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    newItem: PropTypes.string
};
render(<AnimatedShoppingList />, document.getElementById("root"));