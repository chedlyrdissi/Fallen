import React, { Component } from 'react';
import HomeButton from './../common/home-button/home-button.component';
import Article from './../common/article/article.component';
import Language from '../common/language';

class ArticlePage extends Component {

	state = {
		loading: true,
      	game: {},
      	article: {}
	};

	constructor(props) {		
		super(props);
		// console.log(props.match.params.id);
		console.log('loading '+this.state.loading);
		const requestOptions = {
	        method: 'GET',
	        params: {
	        	title: this.props.match.params.title,
	        	language: Language.getLanguage()
	        }
    	};
        fetch(`${process.env.API_URL}/article/${this.props.match.params.title}`, requestOptions)
        .then(response => response.json())
        .then((data) => {
        	console.log(data);
        	// console.log(data.comments);
        	this.setState({loading: false, game: data.game, article: data.article, comments: data.comments});
        	// this.state.list = data.games;
        });
	}

	render() {
		if (this.state.loading) {
			return (<h3>{Language.getTextByCode('LOADING')}...</h3>);
		} else {	
			return (
				<div className="container-fluid">
					<div className="row ml-3">
						<HomeButton />
					</div>
					<div className="row m-3">
						<Article game={this.state.game}	article={this.state.article} comments={this.state.comments}/>
					</div>
				</div>
			);
		}
	}
}

export default ArticlePage;