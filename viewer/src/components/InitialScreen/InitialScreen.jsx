import React from 'react';
import { Translation } from 'react-i18next';
import Interpolate from 'react-interpolate-component';

import HelpButton from '../HelpButton';
import FileZone from './FileZone';
import DjVu from '../../DjVu';
import Options from '../Options';
import { inExtension } from '../../utils';
import LinkBlock from './LinkBlock';
import viewerOptions from '../../viewerOptions';

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

    const clickHelpMessage = viewerOptions.helpButton ?
            <div style={{ clear: 'both', margin: '1em' }}>
                <Interpolate with={formatKeys} format={t('initialScreen:clickHelpButtonFmt')} />
            </div>
        :
            null;

    return (
    <div className="initial_screen">
        <div className="content">
            <div css={`text-align: center; font-size: 2em`}>
                <Interpolate with={formatKeys} format={t('initialScreen:welcomeFmt')} />
            </div>
            <div css={`font-style: italic; margin-top: 0.5em; margin-bottom: 1em; font-size: 0.8em`}>
                <Interpolate with={formatKeys} format={t('initialScreen:poweredByFmt')} />
            </div>

            {inExtension ? <div className="central">
                <Options />
                {/* <div className="update_message">
                    {t('initialScreen:youCanOpenLinks')}
                    <Interpolate with={formatKeys} format={t('initialScreen:tryToClickLinkFmt')} />.
                </div> */}
            </div> : null}
            {/* {isChromeExtension ? <div className="previous_update_message">
                <Interpolate with={formatKeys} format={t('initialScreen:chromeExtensionFmt')} />
            </div> : null} */}
            { clickHelpMessage }
            {inExtension ? <LinkBlock /> : null}
            <FileZone />
        </div>
    </div>);
}}</Translation>;