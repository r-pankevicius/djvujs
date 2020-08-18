import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18next from "i18next";

import ModalWindow from './ModalWindow';
import Actions from '../actions/actions';

class NotificationWindow extends React.Component {

    static propTypes = {
        header: PropTypes.string,
        message: PropTypes.string,
        type: PropTypes.string,
        closeNotificationWindow: PropTypes.func.isRequired
    };

    render() {
        const { header, message, closeNotificationWindow, type } = this.props;

        if (!header) {
            return null;
        }
        const isError = type === 'error';

        return (
            <ModalWindow isError={isError} onClose={closeNotificationWindow}>
                <div className="notification_window">
                    <div className="header">
                        { isError ? i18next.t("Error") + ": " + header : header }
                    </div>
                    <div className="body">{message}</div>
                </div>
            </ModalWindow>
        );
    }
}

export default connect(null, {
    closeNotificationWindow: Actions.closeModalWindowAction
})(NotificationWindow);