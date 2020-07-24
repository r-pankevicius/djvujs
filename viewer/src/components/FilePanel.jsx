import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

import Actions from '../actions/actions';
import { get } from '../reducers/rootReducer';
import FileBlock from './FileBlock';

class FilePanel extends React.Component {

    static propTypes = {
        fileName: PropTypes.string,
        saveDocument: PropTypes.func.isRequired
    };

    render() {
        return <Translation>{ t => (
            <div className="file_panel">
                {this.props.fileName ? (
                    <span title={t('Close document')}>
                        <FontAwesomeIcon
                            className="control_button"
                            onClick={this.props.closeDocument}
                            icon={faTimesCircle}
                        />
                    </span>
                ) : null}
                <FileBlock fileName={this.props.fileName} />
                {this.props.fileName ? (
                    <button
                        className="text_button"
                        onClick={this.props.saveDocument}
                        title={t('Save document')}
                    >
                        {t('Save')}
                    </button>
                ) : null}
            </div>
        )}</Translation>;
    }
}

export default connect(state => ({
    fileName: get.fileName(state),
}), {
        saveDocument: Actions.saveDocumentAction,
        closeDocument: Actions.closeDocumentAction
    })(FilePanel);