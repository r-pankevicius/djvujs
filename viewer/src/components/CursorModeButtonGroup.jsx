import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPaper } from '@fortawesome/free-regular-svg-icons';
import { faICursor } from '@fortawesome/free-solid-svg-icons';

import { get } from '../reducers/rootReducer';
import Consts from '../constants/consts';
import Actions from '../actions/actions';

class CursorModeButtonGroup extends React.Component {

    static propTypes = {
        cursorMode: PropTypes.string.isRequired
    };

    render() {
        const cursorMode = this.props.cursorMode;
        return <Translation>{ t => (
            <div className="button_group">
                <span title={t("Text cursor mode")} className={cursorMode === Consts.TEXT_CURSOR_MODE ? "active" : null}>
                    <FontAwesomeIcon
                        className="control_button"
                        icon={faICursor}
                        onClick={this.props.setTextCursorMode}
                    />
                </span>
                <span title={t("Grab cursor mode")} className={cursorMode === Consts.GRAB_CURSOR_MODE ? "active" : null}>
                    <FontAwesomeIcon
                        className="control_button"
                        icon={faHandPaper}
                        onClick={this.props.setGrabCursorMode}
                    />
                </span>
            </div>
        )}</Translation>;
    }
}

export default connect(state => ({
    cursorMode: get.cursorMode(state)
}), dispatch => ({
    setTextCursorMode: () => dispatch(Actions.setCursorModeAction(Consts.TEXT_CURSOR_MODE)),
    setGrabCursorMode: () => dispatch(Actions.setCursorModeAction(Consts.GRAB_CURSOR_MODE)),
}))(CursorModeButtonGroup);