import Component from '../../../utils/Component';
import {Button} from '../../baseComponents/button/button';
import {Popup} from '../../baseComponents/popup/Popup';
import {ChatList} from '../chatList/ChatList';
import {Header} from '../header/Header';
import './style.less';
import template from './template.hbs';

export class Aside extends Component {
    public init(): void {
        this.children = {
            header: new Header({}),
            chatList: new ChatList({
                classes: ['aside__chatList'],
            }),
            popup: new Popup({
                classes: ['aside__popup-menu hide'],
            }),
            buttonMenu: new Button({
                type: 'button',
                classes: ['aside__button-menu'],
                events: {
                    click: () => this._toggleHide(this.children.popup.element)
                }
            }),
        }
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private _toggleHide(el) {
        el.classList.toggle('hide');
    }
}
