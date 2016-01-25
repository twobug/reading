'use strict';

import React from 'react-native';
const {
	StyleSheet,
	PropTypes,
	View,
	ToolbarAndroid,
	BackAndroid
} = React;
import StyleSheetPropType from 'StyleSheetPropType';
import ViewStylePropTypes from 'ViewStylePropTypes';

import {NaviGoBack} from '../utils/CommonUtils';

let ViewStylePropType = StyleSheetPropType(ViewStylePropTypes);

const propTypes = {
	title: PropTypes.string,
	actions: PropTypes.array,
	navigator: PropTypes.object,
	onActionSelected: PropTypes.func,
	customView: PropTypes.object
}

class ReadingToolbar extends React.Component {
	constructor(props) {
		super(props);

		this.onIconClicked = this.onIconClicked.bind(this);
		this.onActionSelected = this.onActionSelected.bind(this);
	}

	onIconClicked() {
		const {navigator} = this.props;
		if (navigator) {
			if (!NaviGoBack(navigator)) {
				BackAndroid.exitApp();
			};
		} else {
			BackAndroid.exitApp();
		};
	}

	onActionSelected(position) {
		this.props.onActionSelected();
	}

	render() {
		if (this.props.customView) {
			return (
				<ToolbarAndroid style={styles.toolbar}>
					{this.props.customView}
        </ToolbarAndroid>
			)
		} else {
			return (
				<ToolbarAndroid
					style={styles.toolbar}
					actions={this.props.actions}
	        onActionSelected={this.onActionSelected}
	        onIconClicked={this.onIconClicked}
	        navIcon={require('../img/icon_left.png')}
	        titleColor='#fff'
	        title={this.props.title}
	      />
			);
		}
	}
}

let styles = StyleSheet.create({
	toolbar: {
    backgroundColor: '#3e9ce9',
    height: 58
  }
})

ReadingToolbar.propTypes = propTypes;

ReadingToolbar.defaultProps = {
	onActionSelected: function() {},
	title: '',
	actions: []
}

export default ReadingToolbar;