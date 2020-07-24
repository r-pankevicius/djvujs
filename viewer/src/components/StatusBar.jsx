import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Translation } from 'react-i18next';
import { get } from '../reducers/rootReducer';

class StatusBar extends React.Component {

    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        isContinuousScrollMode: PropTypes.bool.isRequired,
    };

    render() {
        const isLoading = this.props.isLoading && !this.props.isContinuousScrollMode;
        return (
            <div className="status_bar">
                <FontAwesomeIcon
                    icon={isLoading ? faSpinner : faCheck}
                    pulse={isLoading ? true : false}
                />
                <Translation>
                {
                    t =>  <span className="message">{isLoading ? t("Loading...") : t("Ready")}</span>
                }
                </Translation>
            </div>
        );
    }
}

export default connect(state => ({
    isLoading: get.isLoading(state),
    isContinuousScrollMode: get.isContinuousScrollMode(state),
}))(StatusBar);