import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/App.jsx';
import Actions from './actions/actions';
import configureStore from './store';
import EventEmitter from 'eventemitter3';
import Consts, { constant } from './constants/consts';
import { get } from './reducers';
import configurei18n from './configurei18n';
import { ActionTypes } from './constants/index.js';

const Events = constant({
    PAGE_NUMBER_CHANGED: null,
    DOCUMENT_CHANGED: null,
    DOCUMENT_CLOSED: null,
});

export default class DjVuViewer extends EventEmitter {

    static VERSION = '0.3.6';

    static Events = Events;
    static i18nInitialized = false;

    /**
     * Constructor.
     * @param {Object} options (Optional) Options to customize viewer behaviour.
     * 
     * options.i18nextOptions - localization options, see documentation (TBD).
     */
    constructor(options) {
        super();
        this.store = configureStore(this.eventMiddleware);

        // Localization is initialized only once, because it's global, not scoped,
        // but that should be fine, because I can't imagine realistic use case of having
        // several viewers using different languages.
        if (!this.constructor.i18nInitialized) {
            configurei18n(options ? options.i18nextOptions : undefined);
            this.constructor.i18nInitialized = true;
        }

        if (process.env.NODE_ENV === 'development') {
            if (module.hot) {
                module.hot.accept('./components/App', () => {
                    this.render(this.htmlElement);
                });
            }
        }
    }

    eventMiddleware = store => next => action => {
        let result;
        switch (action.type) {
            case Consts.SET_NEW_PAGE_NUMBER_ACTION:
                const oldPageNumber = this.getPageNumber();
                result = next(action);
                const newPageNumber = this.getPageNumber();
                if (oldPageNumber !== newPageNumber) {
                    this.emit(Events.PAGE_NUMBER_CHANGED);
                }
                break;

            case Consts.DOCUMENT_CREATED_ACTION:
                result = next(action);
                this.emit(Events.DOCUMENT_CHANGED);
                break;

            case Consts.CLOSE_DOCUMENT_ACTION:
                result = next(action);
                this.emit(Events.DOCUMENT_CLOSED);
                break;

            case Consts.END_FILE_LOADING_ACTION: // use in this.loadDocumentByUrl only
                result = next(action);
                this.emit(Consts.END_FILE_LOADING_ACTION);
                break;

            default:
                result = next(action);
                break;
        }

        return result;
    };

    getPageNumber() {
        return get.currentPageNumber(this.store.getState());
    }

    getDocumentName() {
        return get.fileName(this.store.getState());
    }

    render(element) {
        this.htmlElement = element;
        ReactDOM.render(
            <Provider store={this.store}>
                <App />
            </Provider>
            , element
        );
    }

    configure({ pageNumber, pageRotation, pageScale } = {}) {
        this.store.dispatch({
            type: ActionTypes.CONFIGURE,
            pageNumber, pageRotation, pageScale
        });

        return this;
    }

    loadDocument(buffer, name = "***", config = {}) {
        return new Promise(resolve => {
            this.once(Events.DOCUMENT_CHANGED, () => resolve());
            // the buffer is transferred to the worker, so we copy it 
            this.store.dispatch(Actions.createDocumentFromArrayBufferAction(buffer.slice(0), name, config));
        });
    }

    loadDocumentByUrl(url, config = null) {
        return new Promise(resolve => {
            this.once(Consts.END_FILE_LOADING_ACTION, () => resolve());
            this.store.dispatch({
                type: ActionTypes.LOAD_DOCUMENT_BY_URL,
                url: url,
                config: config
            });
        });
    }
}
