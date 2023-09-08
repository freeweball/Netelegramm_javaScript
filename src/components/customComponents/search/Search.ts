import Component from '../../../utils/Component';
import template from './template.hbs';
import './style.less';
import {Icon} from '../../baseComponents/icon/Icon';
import {Input} from '../../baseComponents/input/Input';
import {Button} from '../../baseComponents/button/button';

export class Search extends Component {
    public init(): void {
        this.children = {
            input: new Input({
                type: 'text',
                placeholder: 'Поиск',
                classes: ['search__input'],
                events: {
                    input: (evt: Event) => this._toggle(evt.target.value.length > 0)
                }
            }),
            iconSearch: new Icon({
                classes: ['search__icon-search'],
            }),
            buttonClose: new Button({
                type: 'button',
                classes: ['search__button-close'],
                events: {
                    click: (evt: Event) => this._clear()
                }
            }),
        };

        this.children.buttonClose.hide()
    }

    private _toggle(val: boolean) {
        const element = this.children.buttonClose;

        val ? element.show() : element.hide();
    }

    private _clear() {
        this.children.input.element.value = '';
        this.children.buttonClose.hide();
    }
    
    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}