import React, { Component } from "react";
import Label from "./components/Label/Label";
import Popup from "./components/Popup/Popup";
import "./App.css";

class App extends Component {
	state = {
		labelName: "",
		labels: [],
		showPopup: false,
		periodicity: 1000
	};
	handleChangeLabel = e => {
		let label = e.target.value;
		this.setState(() => ({
			labelName: label
		}));
	};
	callApi = () => {
		let obj;
		let selfVAr = this;
		fetch(
			`https://api.github.com/search/repositories?q=` + selfVAr.state.labelName
		)
			.then(res => res.json())
			.then(response => {
				console.log(response);
				obj = response.items.map(item => {
					return {
						repoName: item.name,
						score: item.score
					};
				});
				selfVAr.setState({
					searchResults: obj
				});
			});

		this.setState(prevState => ({
			showPopup: true
		}));
	};

	setPeriod = e => {
		let value = e.target.value;
		this.setState({
			periodicity: +value
		});
	};

	setMessage = e => {
		let value = e.target.value;
		this.setState({ message: value });
	};

	handleEnter = () => {
		let labels = [...this.state.labels];
		console.log({ labels });

		let labelName = this.state.labelName;
		labels.push(labelName);
		console.log({ labels });
		this.setState(() => ({
			labels
		}));
	};

	render() {
		const labelArray = this.state.labels;
		console.log(this.state);

		return (
			<div className="App">
				<input
					className="label_search"
					type="text"
					onChange={this.handleChangeLabel}
				></input>
				<button onClick={this.handleEnter}>Enter</button>
				{labelArray &&
					labelArray.map((item, index) => {
						return (
							<div key={index} className="labels-container">
								<Label title={item} />
							</div>
						);
					})}
				<br></br>
				<br></br> <br></br> <br></br> <br></br>
				{this.state.showPopup && <Popup content={this.state.message} />}
				<div>How Often do you want to see the suggestions?</div>
				<input
					type="number"
					className="periodicity"
					onChange={this.setPeriod}
				></input>
				seconds
				<br />
				<textarea
					className="custom message"
					onChange={this.setMessage}
				></textarea>
				<br></br>
				<button onClick={this.callApi}>Submit</button>
			</div>
		);
	}
}

export default App;
