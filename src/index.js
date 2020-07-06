import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import App from './App';
// import GameGallery from './common/game-gallery/game-gallery.component';
// import Header from './common/header/header.component';
// import Articles from './common/articles/articles.component';

ReactDOM.render(
	<App/>,  	
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// <Header loggedIn={ {name: 'chedli'} }/>
//   	<GameGallery/>
//   	<Articles
//   		className="" 
//   		articles={ [
//   			{ title: 'title1', rank: 3, game: {image: 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg', title: 'title1'}},
//   			{ title: 'title2', rank: 2, game: {image: 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg', title: 'title2'}},
//   			{ title: 'title3', rank: 1, game: {image: 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg', title: 'title3'}}
//   		] }/>