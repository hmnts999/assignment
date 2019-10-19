import React, { Component } from "react";
import "./label.css";

class Label extends Component {
	state = {};
	render() {
		return <div className="label-parent">{this.props.title}</div>;
	}
}

export default Label;
