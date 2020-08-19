import React from 'react';
import FilePanel from './FilePanel';
import StatusBar from './StatusBar';
import HelpButton from './HelpButton';
import FullPageViewButton from './FullPageViewButton';
import viewerOptions from '../viewerOptions';

class Footer extends React.Component {
    render() {
        const helpButton = viewerOptions.helpPage ? <HelpButton /> : null;
        const fullPageViewButton = viewerOptions.fullPageSwitch ? <FullPageViewButton /> : null;

        return (
            <div className="footer">
                <StatusBar />
                <FilePanel />
                { helpButton }
                { fullPageViewButton }
            </div>
        );
    }
}

export default Footer;