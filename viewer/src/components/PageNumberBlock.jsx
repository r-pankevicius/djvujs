import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';

import Actions from '../actions/actions';
import PageNumberElement from './PageNumber';
import { get } from '../reducers/rootReducer';

class PageNumberBlock extends React.Component {

    static propTypes = {
        pageNumber: PropTypes.number,
        pagesQuantity: PropTypes.number
    };

    setNewPageNumber(number) {
        if (number >= 1 && number <= this.props.pagesQuantity) {
            this.props.setNewPageNumber(number, true);
        }
    }

    onInputChange = (e) => {
        this.setNewPageNumber(+e.target.value);
    };

    goToNextPage = () => {
        this.setNewPageNumber(this.props.pageNumber + 1);
    };

    goToPrevPage = () => {
        this.setNewPageNumber(this.props.pageNumber - 1);
    };

    render() {
        return <Translation>{ t => (
            <div
                className="page_number_block"
                title={t('clickOnPageHint')}
            >
                <FontAwesomeIcon
                    icon={faArrowAltCircleLeft}
                    onClick={this.goToPrevPage}
                    className="navbut"
                />

                <PageNumberElement {...this.props} />

                <FontAwesomeIcon
                    icon={faArrowAltCircleRight}
                    onClick={this.goToNextPage}
                    className="navbut"
                />
            </div>
        )}</Translation>;
    }
}

export default connect(state => {
    return {
        pageNumber: get.currentPageNumber(state),
        pagesQuantity: get.pagesQuantity(state)
    };
},
    {
        setNewPageNumber: Actions.setNewPageNumberAction
    }
)(PageNumberBlock);