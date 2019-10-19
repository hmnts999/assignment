import React, { Component } from "react";
import "./Popup.css";
class Popup extends Component {
	render() {
		return <div className="popup-parent">{this.props.content}</div>;
	}
}

export default Popup;
