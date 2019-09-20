import React from 'react';
import './SavedCardsList.css'

export default class SavedCardsList extends React.Component{
    
    render() {
        const savedCards = this.props.savedCards;
        const liItems = savedCards.map( (card,idx)=> (<LiItems handleEditCard={this.props.handleEditCard} handleDelete={this.props.handleDelete} key={"Card "+idx} card={card} idx={idx+1}/>) );

        return(
            <div>
                <ul className="saved-cards-list">
                    {liItems}
                </ul>
            </div>
        );
    }
}

function LiItems(props) {
    const card = props.card;

    function cardNoFormatting(cardNo) {
        let firstPart = cardNo.slice(0,6);
        for(let i=6;i<cardNo.length-4;i++) {
            firstPart += "*";
        }
        let secondPart = cardNo.slice(cardNo.length-4,cardNo.length);
        return (firstPart+secondPart);
    }
    
    return(
        <li>
            <div className="card-info">
            <div className="card-info-row">
                <p>{(card.nameOfCard)?(card.nameOfCard):("Card "+props.idx)}</p>
                <a href="#Add-New-Button" id={props.idx} onClick={props.handleEditCard} >{"EDIT"}</a>
            </div>
            <div className="card-info-row">
                <img height={"30px"} alt={`../public/${card.cardType}.svg`} 
                src={require(`../public/${card.cardType}.svg`)} />
                <p>{cardNoFormatting(card.cardNo)}</p>
            </div>
            </div>
            <span><img id={"DEL"+props.idx} height={"15px"} alt={`Delete.svg`} 
                src={`Delete.svg`} onClick={props.handleDelete}/>
            </span>
        </li>
    );
}



