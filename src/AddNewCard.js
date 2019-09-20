import React from 'react';
import './AddNewCard.css';

export default class AddNewCard extends React.Component{
    render(){
        // const hideStyle={
        //     transform: (this.props.isActive)?'scale(1)':'scale(0)',
        //     height: (this.props.isActive)?'auto':'0'
        // }

        return(
            <div className = "AddNewCard-Wrapper" onClick={this.props.showAddCardForm}>
                <p><span>+</span>Add New Card</p>
            </div>
        )
    }
}

