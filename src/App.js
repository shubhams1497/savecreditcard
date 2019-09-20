import React from 'react';
import AddNewCard from './AddNewCard'
import AddCardForm from './AddCardForm'
import SavedCardsList from './SavedCardsList'
import './App.css'

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      addCardActive : false,
      cardNoValid: true,
      expiryDateValid: true,
      expiryMonthValid: true,
      expiryYearValid: true,
      cardNo : "",
      cardType: "",
      cardNoSize: 16,
      cvv:"",
      cvvRequired: true,
      cvvLength: 4,
      validMonth: "MM",
      validYear: "YY",
      nameOfCard: "",
      savedCards: [],
      formIndex: -1,
      cvvError: false
    };

    this.showAddCardForm = this.showAddCardForm.bind(this);
    this.hideAddCardForm = this.hideAddCardForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEditCard = this.handleEditCard.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleBlurOnCardNo = this.handleBlurOnCardNo.bind(this);
  }

  componentDidMount(){
    fetch("https://api.myjson.com/bins/fvzpp")
    .then((response) => (response.json()))
    .then((data) => (this.cardsData = data))

    if(localStorage["savedCards"]) {
      let savedCards = JSON.parse(localStorage["savedCards"]);
      this.setState({savedCards: savedCards});
    }
  }

  addZeroBegin(val) {
    if(val.length === 1) {
      return ("0"+val);
    }
    return val;
  }

  handleBlurOnCardNo(e){
    
    let validity = this.validateCardNo(e.target.value);
    this.setState({cardNoValid: validity});

  }

  validateCardNo(cardNo) {
    if(!this.state.cardType || cardNo.length !== this.state.cardNoSize){
      return false;
    }
    
    return true;
  }

  handleSave(e){
    //console.log(this.state);
    // cardNo : "",
    //   cardType: "",
    //   cardNoSize: 16,
    //   cvv:"",
    //   cvvRequired: true,
    //   cvvLength: 4,
    //   validMonth: "MM",
    //   validYear: "YY",
    //   nameOfCard: "",
    e.preventDefault();

    if(!this.validateCardNo(this.state.cardNo)) {
      // alert("cardNo invalid");
      this.setState({cardNoValid:false});
      return;
    }

    if(this.state.validMonth ==='MM'){
      this.setState({expiryMonthValid: false});
      return;
    }

    if(this.state.validYear ==='YY'){
      this.setState({expiryYearValid: false});
      return;
    }

    if(this.state.cvvRequired && this.state.cvv.length !== this.state.cvvLength){
      this.setState({cvvError:true});
      return;
    }

    if(!this.state.cvvRequired) {
      if(this.state.cvv.length !== 0 && this.state.cvv.length !==this.state.cvvLength) {
        this.setState({cvvError:true});
        return;
      }
    }




    let savedCards = this.state.savedCards;

    let newCardDetails = {cardNo: this.state.cardNo, cardType:this.state.cardType, cardNoSize:this.state.cardNoSize, cvvRequired: this.state.cvvRequired, cvvLength:this.state.cvvLength, validMonth:this.state.validMonth, validYear:this.state.validYear,nameOfCard:this.state.nameOfCard};
     
    if(this.state.formIndex !== -1){
      console.log(this.state.formIndex);
      savedCards[this.state.formIndex] = newCardDetails;
    }

    this.setState({savedCards:savedCards});
    this.updateLocalStorage(savedCards);
    this.hideAddCardForm();
    
    //console.log(this.state.savedCards);
  }

  handleChange(e){
    // console.log(e.target.title);
    
      if(e.target.title === "MM") {
        this.setState({validMonth: this.addZeroBegin(e.target.value),expiryMonthValid:true});
        return;
      }
      else if(e.target.title === "YY") {
        this.setState({validYear: this.addZeroBegin(e.target.value),expiryYearValid:true});
        return;
      }
      else if(e.target.title === "cardName") {
        this.setState({nameOfCard: e.target.value});
        return;
      }
      else if(e.target.title === "cardCvv") {
        this.setState({cvv: e.target.value });

        if(e.target.value.length === this.state.cvvLength) {
          this.setState({cvvError:false});
        }
        return;
      }

    const filteredInput = e.target.value.replace(/\D+/g, '');

    if(filteredInput.length === this.state.cardNoSize){
      if(this.validateCardNo(filteredInput)){
        this.setState({cardNoValid:true})
      }
      else{
        this.setState({cardNoValid:false})
      }
    }
    this.setState({ cardNo: filteredInput }); 
    let cardEntries = Object.entries(this.cardsData);
    let cardFound = false;

    for(let i=0; i<cardEntries.length; i++){
      let [cardtype,cardInfo] = cardEntries[i];
      let reg = new RegExp(cardInfo.cardPattern.slice(1,cardInfo.cardPattern.length-1));
      //console.log(reg);
      //console.log(filteredInput);
      if(reg.test(filteredInput)) {
        this.setState( {cardType: cardtype, cardNoSize: cardInfo.cardNumberLength, cvvRequired : (cardInfo.cvv === "required")?true:false, cvvLength: cardInfo.cvvLength} );
        cardFound = true;
        break;
      }
    }

    if(!cardFound)
    {
        this.setState({cardType: "", cardNoSize: 16, cvvRequired:true, cvvLength:4});
    }
  }

  resetFormState(){
    this.setState(
      {
        cardNo : "",
        cardType: "",
        cardNoSize: 16,
        cvv:"",
        cvvRequired: true,
        cvvLength: 4,
        validMonth: "MM",
        validYear: "YY",
        nameOfCard: "",
        formIndex: -1,
        cardNoValid:true,
        expiryDateValid:true,
        expiryMonthValid:true,
        expiryYearValid:true,
        cvvError: false
      }
    )
  }
  
  showAddCardForm(){
    let status = this.state.addCardActive;
    if(!status) {
      this.setState({addCardActive: true, formIndex: this.state.savedCards.length});
    }
  }

  hideAddCardForm(){
    let status = this.state.addCardActive;
    if(status) {
      this.setState({addCardActive: false}); 
    }
    this.resetFormState();
  }

  handleEditCard(e){
    console.log(e.target.id);
    let cardSavedDetais = this.state.savedCards[e.target.id-1];
    cardSavedDetais = Object.assign(cardSavedDetais,{formIndex:(e.target.id-1), addCardActive:true});
    //console.log(cardSavedDetais);
    this.setState(cardSavedDetais);
    //this.showAddCardForm();
  }

  handleDelete(e){
    let idx = e.target.id.slice(3)-1;
    let savedCards = this.state.savedCards.slice();
    savedCards.splice(idx,1);
    this.setState({savedCards: savedCards});
    this.updateLocalStorage(savedCards);
    this.hideAddCardForm();
  }

  updateLocalStorage(savedCards) {
    localStorage["savedCards"] = JSON.stringify(savedCards);
  }

  render() {

    const cardDetails = {cardNo: this.state.cardNo, cardType:this.state.cardType, cardNoSize:this.state.cardNoSize,cvv:this.state.cvv,cvvRequired:this.state.cvvRequired,cvvLength:this.state.cvvLength,validMonth:this.state.validMonth,validYear:this.state.validYear,
    nameOfCard:this.state.nameOfCard, cardNoValid:this.state.cardNoValid, 
    expiryDateValid:this.state.expiryDateValid,expiryMonthValid:this.state.expiryMonthValid,
    expiryYearValid:this.state.expiryYearValid, cvvError:this.state.cvvError};

    return (
      <div className="parent-container">
        <h3>Manage Credit Cards</h3>
        <div id="Add-New-Button">
          { 
            (this.state.addCardActive)? <AddCardForm cardDetails ={cardDetails} handleChange={this.handleChange} hideAddCardForm={this.hideAddCardForm} handleBlurOnCardNo={this.handleBlurOnCardNo} handleSave = {this.handleSave} /> : 
            <AddNewCard showAddCardForm={this.showAddCardForm}/>
          }
        </div>
        <SavedCardsList handleDelete={this.handleDelete} handleEditCard={this.handleEditCard} savedCards={this.state.savedCards} />
      </div>
    )
  }
}

export default App;
