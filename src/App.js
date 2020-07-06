import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import routes from './routes';

import Header from './common/header/header.component';
// import Articles from './common/articles/articles.component';
import Home from './pages/home';
import Search from './pages/search';
import ArticlePage from './pages/article-page';
// import NotFound from './pages/not-found';
import GamePrice from './common/game-price/game-price.component';
import CreditCard from './common/credit-card/credit-card.component';
import Payment from './pages/payment';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Route exact path="/" component={Home}/>
      <Route exact path={'/' + routes.ARTICLE+'/:id'} component={ArticlePage}/>
      <Route exact path={'/' + routes.GAME} component={GamePrice}/>
      <Route exact path={'/' + routes.PAYMENT + '/:title'} component={Payment}/>
      <Route exact path={'/' + routes.CREDIT_CARD} component={CreditCard}/>
      <Route exact path={'/' + routes.SEARCH + '/:title'} component={Search}/>
    </BrowserRouter>
  );
}

export default App;
      // <Route path="**" component={NotFound}/>
