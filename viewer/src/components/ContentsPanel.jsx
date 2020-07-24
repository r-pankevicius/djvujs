import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translation } from 'react-i18next';

import Actions from '../actions/actions';
import TreeItem from './TreeItem';

class ContentsPanel extends React.Component {

    static propTypes = {
        contents: PropTypes.array,
        setPageByUrl: PropTypes.func.isRequired
    };

    onTreeItemClick = (url) => {
        this.props.setPageByUrl(url);
    };

    convertBookmarkArrayToTreeItemDataArray(bookmarkArray) {
        return bookmarkArray && bookmarkArray.map(bookmark => this.makeTreeItemDataByBookmark(bookmark));
    }

    makeTreeItemDataByBookmark(bookmark) {
        return {
            name: bookmark.description,
            children: this.convertBookmarkArrayToTreeItemDataArray(bookmark.children),
            callback: this.onTreeItemClick,
            callbackData: bookmark.url
        };
    }

    render() {
        const contents = this.props.contents;
        return (
            <Translation>{ t => 
                <div className="contents_panel">
                    <div className="header">{t('Contents')}</div>
                    {contents && contents.map((bookmark, i) => {
                        return <TreeItem key={i} {...this.makeTreeItemDataByBookmark(bookmark)} />
                    })}
                    {contents ? null :
                        <div className="no_contents_message">{t('No contents provided')}</div>
                    }
                </div>
            }</Translation>
        );
    }
}

export default connect(null, {
    setPageByUrl: Actions.setPageByUrlAction
})(ContentsPanel);