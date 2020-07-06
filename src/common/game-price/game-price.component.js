import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

import './game-price.component.css';

class GamePrice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.game = {
      image: 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg',
      title: 'game name',
      price: 15.03
    };
    this.state.discount = 5;

  }

  render() {
    return (
      <Card>
        <Card.Body className="text-center">
          <div className="row">
            <div className="col-5">
              <div className="row center-text m-auto">
                <img alt="" className="game-price-icon" src={this.state.game.image}/>
              </div>
              <div className="row center-text mt-3">
                {this.state.game.title}
              </div>
              <div className="row center-text mt-3">
                {this.state.game.price + ' $'}            
              </div>
            </div>
            <div className="col-7 self-center">
              <div className="row text-center">
                <div className="col-7">original price</div>
                <div className="col-5">{this.state.game.price + ' $'}</div>
              </div>

              <div className="row  text-center">
                <div className="col-7">-</div>
                <div className="col-5"></div>
              </div>

              <div className="row  text-center">
                <div className="col-7">discount</div>
                <div className="col-5">{this.state.discount + ' $'}</div>
              </div>

              <div className="row  text-center">
                <div className="col-7">discount</div>
                <div className="col-5">{this.state.discount + ' $'}</div>
              </div>

              <hr/>

              <div className="row  text-center">
                <div className="col-7">=</div>
                <div className="col-5"></div>
              </div>

              <div className="row  text-center">
                <div className="col-7">final price</div>
                <div className="col-5">{ (this.state.game.price - this.state.discount) + ' $'}}</div>
              </div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="row">
            <div className="col"></div>
            <div className="col text-right">
              <button className="btn btn-outline-success" onClick={this.props.next}>Next <span className="fa fa-angle-right ml-3"/></button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    );
  }
}

export default GamePrice;