import React, { Component } from 'react';
import HomeButton from './../common/home-button/home-button.component';
import Article from './../common/article/article.component';

class ArticlePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
	      	isLoaded: false,
	      	items: []
	    };
		console.log(props.match.params.id);
	}

	render() {
		return (
			<div>
				<div className="row">
					<HomeButton />
				</div>
				<div className="row">
					<Article 
						gameRank="2"
						game={ {title: 'game title', price: 30.40, image: 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg'} }
						article={ {title: 'article title', body: 'bejabonlevnanvklaenlkvnalknvk;aenvpk;anlvbnaejobn vlkaenlkvnaelkfnlkaenlknealkgnakjbgajnlkjn aelknfaeolinjgolk angkj naeoihgapjg pajeglkmna;lng ae bna nsnj rsknksbrn  oihs p jgpisrnjnbg sonoikrsn  onsr oinbsnhlknsoln olik slrn jobsjkbsjknrglkn sogj posrjgp ', rank: 65} }
					/>
				</div>
			</div>
		);
	}
}

export default ArticlePage;