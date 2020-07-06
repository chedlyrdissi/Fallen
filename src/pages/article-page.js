import React, { Component } from 'react';
import HomeButton from './../common/home-button/home-button.component';
import Article from './../common/article/article.component';

class ArticlePage extends Component {

	state = {
		loading: true,
      	game: {},
      	article: {}
	};

	constructor(props) {		
		super(props);
		// console.log(props.match.params.id);
		const requestOptions = {
	        method: 'GET',
	        params: {
	        	title: this.props.match.params.title
	        }
    	};
        fetch('http://192.168.137.1:4000/article/'+this.props.match.params.title, requestOptions)
        .then(response => response.json())
        .then((data) => {
        	console.log(data);
        	this.setState({loading: false, game: data.game, article: data.article});
        	// this.state.list = data.games;
        });
	}

	render() {
		if (this.state.loading) {
			return (<h3>Loading...</h3>);
		} else {	
			return (
				<div>
					<div className="row ml-3">
						<HomeButton />
					</div>
					<div className="row m-3">
						<Article game={this.state.game}	article={this.state.article}/>
					</div>
				</div>
			);
		}
	}
}

export default ArticlePage;