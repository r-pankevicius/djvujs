import React from 'react';
import { Translation } from 'react-i18next';
import Interpolate from 'react-interpolate-component';

import HelpButton from './HelpButton';
import FileZone from './FileZone';
import DjVu from '../DjVu';
import Options from './Options';
import { inExtension, isChromeExtension } from '../utils';

export default () => <Translation>{ t => {

    const formatKeys = {
        viewerVersion: DjVu.Viewer.VERSION,
        djvuLibraryVersion: DjVu.VERSION,
        linkToSampleDjvuFile:
            <a target="_blank" rel="noopener noreferrer" href="https://djvu.js.org/assets/djvu_examples/DjVu3Spec.djvu">
                {t('initialScreen:Some DjVu file')}
            </a>,
        allowAccessToFileUrls: <strong>"{t('initialScreen:Allow access to file URLs')}"</strong>,
        helpButton: <HelpButton />
    };

    return (
    <div className="initial_screen">
        <div className="content">
            <div className="header">
                <Interpolate with={formatKeys} format={t('initialScreen:welcomeFmt')} />
            </div>
            <div className="djvujs_version">
                <Interpolate with={formatKeys} format={t('initialScreen:poweredByFmt')} />
            </div>

            {inExtension ? <div className="central">
                <Options />
                <div className="update_message">
                    {t('initialScreen:youCanOpenLinks')}
                    <Interpolate with={formatKeys} format={t('initialScreen:tryToClickLinkFmt')} />
                </div>
            </div> : null}
            {isChromeExtension ? <div className="previous_update_message">
                <Interpolate with={formatKeys} format={t('initialScreen:chromeExtensionFmt')} />
            </div> : null}
            <div style={{ clear: 'both' }}>
                <Interpolate with={formatKeys} format={t('initialScreen:clickHelpButtonFmt')} />
            </div>
            <FileZone />
        </div>
    </div>);
}}</Translation>;