import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';
import Language from '../language';
import './articles.component.css'

class Articles extends Component {

	read = (e) => {
		e.preventDefault();
		console.log(e.target.attributes.target.value);
	};

	render() {
		let rows = [];

		for ( let art of this.props.articles ) {
			rows.push(
				<tr key={art.title} rank={art.rank} className="text-center">
			    	<td>
			    		<img className="game-article-icon" src={art.game.image} alt="" />
			    		<label className="ml-4">{art.game.title}</label>
			    	</td>
			      	<td>{art.title}</td>
			      	<td>{art.rank}</td>
			      	<td>
			      		<Link to={'/article/' + art.title}>
			      			<button className="btn btn-outline-primary" target={art.title}>{Language.getTextByCode('READ_ARTICLE')}</button>
			      		</Link>
			      	</td>
			    </tr>
			);
		}

		rows.sort(function(a,b){
			return a.props.rank - b.props.rank;
		});

		return (
			<div className="group lowered">
				<label>{Language.getTextByCode('ARTICLES')}</label>
				<div className="p-auto">
					<Table bordered hover>
					  	<thead>
						    <tr className="text-center">
						    	<th>{Language.getTextByCode('GAME')}</th>
						    	<th>{Language.getTextByCode('ARTICLE')}</th>
						    	<th>{Language.getTextByCode('ARTICLE')}<br/>{Language.getTextByCode('RANK')} </th>
						    	<th></th>
						    </tr>
					  	</thead>
					  	<tbody>
						  	{ rows }
					  	</tbody>
					</Table>
				</div>
			</div>
		);
	}
}

export default Articles;