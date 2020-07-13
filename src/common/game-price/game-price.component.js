import React, { Component } from 'react';
import Language from '../language';
import Card from 'react-bootstrap/Card';

import './game-price.component.css';

class GamePrice extends Component {
  state = {};
  constructor(props) {
    super(props);
    console.log(this.props.discount);
    // this.state.game = {
    //   image: 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg',
    //   title: 'game name',
    //   price: 15.03
    // };
    // this.state.discount = 5;

  }

  render() {
    return (
      <Card>
        <Card.Body className="text-center">
          <div className="row">
            <div className="col-5">
              <div className="row center-text m-auto">
                <img alt="" className="game-price-icon" src={this.props.game.image}/>
              </div>
              <div className="row center-text mt-3">
                {this.props.game.title}
              </div>
              <div className="row center-text mt-3">
                { (Language.getLanguage() === 'de'? '€ ':'') + this.props.game.price[Language.getLanguage()] + (Language.getLanguage() === 'en'? ' $':'') }            
              </div>
            </div>
            <div className="col-7 self-center">
              <div className="row text-center">
                <div className="col-7">{Language.getTextByCode('ORIGINAL_PRICE')}</div>
                <div className="col-5">{ (Language.getLanguage() === 'de'? '€ ':'') + this.props.game.price[Language.getLanguage()] + (Language.getLanguage() === 'en'? ' $':'') }</div>
              </div>

              <div className="row  text-center">
                <div className="col-7">-</div>
                <div className="col-5"></div>
              </div>

              <div className="row  text-center">
                <div className="col-7">{Language.getTextByCode('DISCOUNT')}</div>
                <div className="col-5">{ (Language.getLanguage() === 'de'? '€ ':'') + this.props.discount + (Language.getLanguage() === 'en'? ' $':'') }</div>
              </div>

              <hr/>

              <div className="row  text-center">
                <div className="col-7">=</div>
                <div className="col-5"></div>
              </div>

              <div className="row  text-center">
                <div className="col-7">{Language.getTextByCode('FINAL_PRICE')}</div>
                <div className="col-5">{
                  ((this.props.game.price[Language.getLanguage()] - this.props.discount) >= 0 )?
                    (Language.getLanguage() === 'de'? '€ ':'') + (this.props.game.price[Language.getLanguage()] - this.props.discount) + (Language.getLanguage() === 'en'? ' $':'')
                  :
                    (Language.getLanguage() === 'de'? '€ ':'') + '0' + (Language.getLanguage() === 'en'? ' $':'')
                }</div>
              </div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="row">
            <div className="col"></div>
            <div className="col text-right">
              <button className="btn btn-outline-success" onClick={this.props.next}>{Language.getTextByCode('NEXT')} <span className="fa fa-angle-right ml-3"/></button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    );
  }
}

export default GamePrice;