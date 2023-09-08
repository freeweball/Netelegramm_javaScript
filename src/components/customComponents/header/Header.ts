import Component from '../../../utils/Component';
import {Button} from '../../baseComponents/button/button';
import {Search} from '../search/Search';
import './style.less';
import template from './templarte.hbs';

export class Header extends Component {
    public init(): void {
        this.children = {
            burger: new Button({
                type: 'button',
                classes: ['header__button-burger'],
            }),
            search: new Search({}),
        }
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
