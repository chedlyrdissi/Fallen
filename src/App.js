import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// import routes from './routes';
import Language from './common/language';

import Header from './common/header/header.component';
import CreateArticle from './common/create-article/create-article.component';
// import Articles from './common/articles/articles.component';
import Home from './pages/home';
import Search from './pages/search';
import ArticlePage from './pages/article-page';
// import NotFound from './pages/not-found';
import Payment from './pages/payment';
// import LogIn from './common/log-in/log-in.component';

class App extends Component {

  selectLanguageClick = (e) => {
    // console.log(e.target.getAttribute('value'));
    Language.setLanguage(e.target.getAttribute('value'));
    window.location.reload(false);
  };

  render() {
    let list = [];
    // console.log(Language.options);
    for (let elem of Language.options) {
      list.push(<li className="list-group-item" onClick={this.selectLanguageClick} key={elem.value} value={elem.value}>{elem.label}</li>);
    }
    return (
      <BrowserRouter>
        { (Language.getLanguage())?  
            <div>
              <Header className=""/>
              <div className=" text-center place-content-center">
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path={'/article/:title'} component={ArticlePage}/>
                  <Route exact path={'/edit/article'} component={CreateArticle}/>
                  <Route exact path={'/payment/:title'} component={Payment}/>
                  <Route exact path={'/search/:title'} component={Search}/>
                  <Route path='*' exact={true}/>
                  <Redirect from='*' to='/' />
                </Switch>
              </div>
            </div>
          :
            <div className="container-fluid justify-content-center align-items-center language-main-container">
              <div className="row text-center justify-content-center align-items-center">
                <ul className="list-group">
                  {list}
                </ul>             
              </div>
            </div>
        }
      </BrowserRouter>
    );
  }
}

export default App;
      // <Route path="**" component={NotFound}/>
