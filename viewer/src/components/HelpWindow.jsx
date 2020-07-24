import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import { Translation } from 'react-i18next';
import Interpolate from 'react-interpolate-component';

import ModalWindow from './ModalWindow';
import Actions from '../actions/actions';
import { get } from '../reducers/rootReducer';
import DjVu from '../DjVu';

class HelpWindow extends React.Component {

    static propTypes = {
        closeHelpWindow: PropTypes.func.isRequired
    };

    render() {
        const { closeHelpWindow, isShown } = this.props;

        if (!isShown) {
            return null;
        }

        return <Translation>{ t => {
            const formatKeys = {
                viewerVersion: DjVu.Viewer.VERSION,
                djvuLibraryVersion: DjVu.VERSION,
                mailToAuthorLink: <a target="_blank" rel="noopener noreferrer" href="mailto:djvujs@yandex.ru">djvujs@yandex.ru</a>,
                officialWebSiteLink: <a target="_blank" rel="noopener noreferrer" href="https://djvu.js.org/">djvu.js.org</a>,
                githubLink: <a target="_blank" rel="noopener noreferrer" href="https://github.com/RussCoder/djvujs">GitHub</a>,
                expandIcon: <FontAwesomeIcon icon={faExpand} />,
                compressIcon: <FontAwesomeIcon icon={faCompress} />
            };

            return (
                <ModalWindow onClose={closeHelpWindow} isFixedSize={true}>
                    <div className="help_window">
                    <div className="header">
                        <Interpolate with={formatKeys} format={t('helpScreen:productInfoFmt')} />
                    </div>
                        <div className="para">
                            {t('helpScreen:appDescription')}<br />
                            <Interpolate with={formatKeys} format={t('helpScreen:fellFreeWriteToAuthorAboutProblemFmt')} /><br />
                            <Interpolate with={formatKeys} format={t('helpScreen:officialWebSiteFmt')} /><br />
                            <Interpolate with={formatKeys} format={t('helpScreen:sourceCodeAvailableOnFmt')} /><br />
                        </div>

                        <div className="header">{t('helpScreen:Keyboard Shortcuts')}</div>
                        <div className="para"><em>Ctrl+S</em> - {t('Save document')}</div>
                        <div className="para"><em>{t('helpScreen:Left Arrow')}</em> - {t('helpScreen:go to the previous page')}</div>
                        <div className="para"><em>{t('helpScreen:Right Arrow')}</em> - {t('helpScreen:go to the next page')}</div>

                        <div className="header">{t('helpScreen:Controls')}</div>
                        <div className="para">
                            <Interpolate with={formatKeys} format={t('helpScreen:fullPageModeFmt')} />
                            &nbsp;
                            {t('helpScreen:fullPageHasNoEffectInBrowserExtension')}
                        </div>
                    </div>
                </ModalWindow>
            );}}</Translation>;
    }
}

export default connect(state => ({
    isShown: get.isHelpWindowShown(state)
}), {
        closeHelpWindow: Actions.closeHelpWindowAction
    })(HelpWindow);