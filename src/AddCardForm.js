import React from 'react';
import './AddCardForm.css';

export default class AddCardForm extends React.Component{

    render(){

    //    cardDetails: {
    //       cardNo : "",
    //       cardType: "",
    //       cardNoSize: 16,
    //       cvv:"",
    //       cvvRequired: true,
    //       cvvLength: 4,
    //       validMonth: "MM",
    //       validYear: "YY",
    //       nameOfCard: "",
    //   }

        return(
            
                <div className = "AddCardForm">
                    <p>&nbsp;&nbsp;&nbsp;Add New Card</p>
                    <form>
                        <div className="row-display">
                            <div>
                            <InputBox title={"cardNo"} handleBlurOnCardNo={this.props.handleBlurOnCardNo} value={this.props.cardDetails.cardNo} maxlength={this.props.cardDetails.cardNoSize} 
                            placeholder={"Enter Card Number"} spanText={this.props.cardDetails.cardType} 
                            onChange={this.props.handleChange} />
                            <p style={{visibility:(!this.props.cardDetails.cardNoValid)?"visible":"hidden" , color:"red"}}>Enter Valid Card Number</p>
                            </div>
                            <div style={{margin:"auto"}}>
                                <span>Valid Through</span>
                                <Select from={1} to={12} defaultValue={this.props.cardDetails.validMonth} title={"MM"} onChange={this.props.handleChange}/>
                                <Select from={19} to={58} defaultValue={this.props.cardDetails.validYear} title={"YY"} onChange={this.props.handleChange}/>
                                <p style={{visibility:(!(this.props.cardDetails.expiryMonthValid && this.props.cardDetails.expiryYearValid))?"visible":"hidden" , color:"red"}}>
                                    Enter Card Expiry {(!this.props.cardDetails.expiryMonthValid)?"Month ":""} {(!this.props.cardDetails.expiryYearValid)?"Year ":""} Details</p>
                            </div>
                        </div>
                        <div>
                        <div className="row-display">
                            <div>
                                <InputBox title={"cardCvv"} maxlength={this.props.cardDetails.cvvLength} type="password" 
                                onChange={this.props.handleChange} placeholder={"Enter CVV"}/>
                                <p style={{visibility:(this.props.cardDetails.cvvError)?"visible":"hidden" , color:"red"}}>
                                    Enter Valid CVV Number!!!
                                </p>
                            </div>
                            <InputBox title={"cardName"} value={this.props.cardDetails.nameOfCard} type="text" onChange={this.props.handleChange}  placeholder={"Name this card for future use"}/>
                        </div>
                        <div className="row-display">
                        <button type="submit" onClick={this.props.handleSave}>SAVE CARD</button>
                        <button onClick={this.props.hideAddCardForm}>CANCEL</button>
                        </div>
                        </div>
                    </form>
                </div>
            
        )
    }
}


function InputBox(props) {

    return(
        <div className="Input-box">
            <input onBlur={props.handleBlurOnCardNo} title={props.title} value={props.value} maxLength = {props.maxlength} placeholder={props.placeholder}
            onChange={props.onChange} type={props.type}/>
            {(props.spanText)? <span><img height={"30px"} alt={`../public/${props.spanText}.svg`} src={require(`../public/${props.spanText}.svg`)} />
            </span> : <span></span> }
        </div>
    )
}



function Select(props){
    let options = [<Option key={props.title} value={props.title} isTitle={true}/>];

    for(let i=props.from; i<=props.to; i++) {
        options.push(<Option key={props.title+i} value={i}/>);
    }

    return (
        <select title={props.title} onChange={props.onChange} value={props.defaultValue}>{options}</select>
    );

}



function Option(props){

    function addZeroBegin(val) {
        let new_val = ""+val;
        if(new_val.length === 1)
        {
            return ("0"+new_val);
        }
        return new_val;
    }

    if(props.isTitle)
    {
        return (
            <option value={props.value} disabled>{props.value}</option>
        ); 
    }

    return(
        <option value={addZeroBegin(props.value)} >{addZeroBegin(props.value)}</option>
    )
}