import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import routes from './routes';

import Header from './common/header/header.component';
// import Articles from './common/articles/articles.component';
import Home from './pages/home';
import Search from './pages/search';
import ArticlePage from './pages/article-page';
// import NotFound from './pages/not-found';
import Payment from './pages/payment';
import LogIn from './common/log-in/log-in.component';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header className=""/>
        <div className=" text-center place-content-center">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path={'/' + routes.ARTICLE+'/:title'} component={ArticlePage}/>
            <Route exact path={'/' + routes.PAYMENT + '/:title'} component={Payment}/>
            <Route exact path={'/' + routes.SEARCH + '/:title'} component={Search}/>
            <Route exact path="/log-in" component={LogIn}/>
            <Route path='*' exact={true}/>
            <Redirect from='*' to='/' />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
      // <Route path="**" component={NotFound}/>
