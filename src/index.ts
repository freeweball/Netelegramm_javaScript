import Router from './utils/Router';
import {Page404} from './pages/404/Page404'
import {Page500} from './pages/500/Page500';
import {MainPage} from './pages/mainPage/mainPage';
import './style/style.less';

export enum RouterPaths {
    PAGEMAIN = '/',
    PAGE404 = '/page404',
    PAGE500 = '/page500',
}

window.addEventListener('DOMContentLoaded', async () => {
    Router
        .use(RouterPaths.PAGEMAIN, MainPage)
        .use(RouterPaths.PAGE404, Page404)
        .use(RouterPaths.PAGE500, Page500);

    switch (window.location.pathname) {
        case RouterPaths.PAGEMAIN:
        case RouterPaths.PAGE500: {
            Router.start();

            break;
        }

        default: {
            Router.start();
            Router.go(RouterPaths.PAGE404)
        }
    }        
});
