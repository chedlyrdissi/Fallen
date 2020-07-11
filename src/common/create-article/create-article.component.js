import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import TextField from '@material-ui/core/TextField';

import $ from 'jquery';
import Language from '../language';
import UserProfile from '../user-profile';
import './create-article.component.css'

class CreateArticle extends Component {

	state = {
		loading: true,
		games: [],
		valid: true
	}

	constructor(props) {
		super(props);
		const requestOptions = {
	        method: 'GET',
	        params: {
	        	language: Language.getLanguage()
	        }
    	};
        fetch('http://localhost:4000/home/'+Language.getLanguage(), requestOptions)
        .then(response => response.json())
        .then((data) => {
        	this.setState({loading: false, games: data.games});
        });
	};	

	createNewArticle = async () => {
		const requestOptions = {
	        method: 'POST',
			headers: { 'Content-Type': 'application/json' },
	        params: {
	        	language: Language.getLanguage()
	        },
	        body: JSON.stringify({
	        	body: $("#newArticleBody").prop('value'),
	        	title: $("#newArticleTitle").prop('value'),
	        	game: $("input[name='game']").filter((elem)=>{return elem.getAttribute('value')}).getAttribute('checked')
	        })
    	};
    	console.log(requestOptions.body.game);
        // fetch('http://localhost:4000/edit/article/'+this.props.match.params.title+'/'+Language.getLanguage(), requestOptions)
        // .then(response => response.json())
        // .then((data) => {
        // 	// console.log(data);
        // 	// this.setState({loading: false, game: data.game, article: data.article});
        // 	// this.state.list = data.games;
        // });
	};

	selectGame = (e) => {
		// console.log(e.target.getAttribute('value'));
		// check checkbox
		$("input[name='game']").filter((elem)=>{
			// console.log(this.state.games[elem])
			// console.log(e.target.getAttribute('value'));
			return e.target.getAttribute('value') === this.state.games[elem].title;
		}).attr('checked', true);
	};

	componentDidMount() {
		$(document).ready(function(){
			// $("form").submit(function(e){
			// 	e.preventDefault();
			// 	const requestOptions = {
		 //        method: 'POST',
			// 	headers: { 'Content-Type': 'application/json' },
		 //        params: {
		 //        	language: Language.getLanguage(),
		 //        	userId: UserProfile.getUser().id
		 //        },
		 //        body: JSON.stringify({
			//         	body: $("#newArticleBody").prop('value'),
			//         	title: $("#newArticleTitle").prop('value'),
			//         	game: $("input[name='game'][checked]")[0]
			//         })
		 //    	};
	 
			// 	fetch('http://localhost:4000/edit/article/'+Language.getLanguage()+'/'+UserProfile.getUser().id, requestOptions)
		 //        .then(response => response.json())
		 //        .then((data) => {
		 //        	console.log(data);
		 //        	if (data.valid) {
		 //        		console.log('valid');
		 //        		$("#titleErrorMsg").html('');
		 //        		$("#titleErrorMsg").hide();
		 //        		this.setState({valid: true});
		 //        		return true;
		 //        	} else {
		 //        		if (data.titleInvalid) {
		 //        			this.setState({titleInvalid: true, valid: false});
		 //        		}
		 //        		$("#titleErrorMsg").html(data.message);
		 //        		$("#titleErrorMsg").show();
		 //        	}
		 //        });

			// 	return false;
			// });
			$("#titleErrorMsg").hide();
		});
	};

	submitForm = (e) => {
		e.preventDefault();
		const requestOptions = {
        method: 'POST',
		headers: { 'Content-Type': 'application/json' },
        params: {
        	language: Language.getLanguage(),
        	userId: UserProfile.getUser().id
        },
        body: JSON.stringify({
	        	body: $("#newArticleBody").prop('value'),
	        	title: $("#newArticleTitle").prop('value'),
	        	game: $("input[name='game'][checked]")[0].getAttribute('value')
	        })
    	};

		fetch('http://localhost:4000/edit/article/'+Language.getLanguage()+'/'+UserProfile.getUser().id, requestOptions)
        .then(response => response.json())
        .then((data) => {
        	console.log(data);
        	if (data.valid) {
        		console.log('valid');
        		$("#titleErrorMsg").html('');
        		$("#titleErrorMsg").hide();
        		this.setState({valid: true});
        		return true;
        	} else {
        		if (data.titleInvalid) {
        			this.setState({titleInvalid: true, valid: false});
        		}
        		$("#titleErrorMsg").html(Language.getTextByCode(data.message));
        		$("#titleErrorMsg").show();
        	}
        });

		return false;
	};

	title = '';

	click = () => {
		console.log($("input[name='game'][checked]")[0].getAttribute('value'));
	};

	render() {
		let games = [];
		for (let game of this.state.games) {
      		games.push(<li className="list-group-item" onClick={this.selectGame} key={game.title} value={game.title}><input className="pt-1" type="radio" name="game" value={game.title} required/>{' '+game.title}</li>);
		}

		if (this.state.loading) {
			return (<h3>{Language.getTextByCode('LOADING')}</h3>);
		} else {
			if (UserProfile.isLoggedIn()) {				
				return (
					<form method="" action="" onSubmit={this.submitForm}>
						<div className="container-fluid border">
							<div className="row">
								<div className="col-2">
									<div className="row p-3">
										<label>{Language.getTextByCode('PLEASE_SELECT_GAME')}</label>
									</div>
									<div className="row p-3">
										<ul className="list-group text-left">
						                  {games}
						                </ul>		
									</div>
								</div>
								<div className="col-10">
					                <Card style={{height: '100%'}}>
										<Card.Header>
											<TextField autoFocus error={this.state.titleInvalid} onChange={(e)=> this.title=e.target.value} margin="dense" id="newArticleTitle" name="title" label={Language.getTextByCode('TITLE')} type="text" fullWidth required/>
											<p id="titleErrorMsg" className="alert alert-danger" hidden={this.state.valid}></p>
										</Card.Header>
									  	<Card.Body>
									    	<TextField autoFocus multiline={true} error={this.state.bodyInvalid} margin="dense" id="newArticleBody" name="body" label={Language.getTextByCode('CONTENT')} fullWidth required/>
									    	<Card.Text>
									    	</Card.Text>
										</Card.Body>
										<Card.Footer>
									    	<button className="btn btn-outline-primary" onClick={this.click}>{Language.getTextByCode("CREATE")}</button>
									    </Card.Footer>
									</Card>			
								</div>
							</div>
						</div>
					</form>
				);
			} else {
				return (<h3>{Language.getTextByCode('NEED_LOG_IN_CREATE_ARTICLE')}</h3>);
			}
		}
	}
}

export default CreateArticle;
// action={"/article/"+this.title}