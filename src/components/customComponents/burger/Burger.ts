import Component from '../../../utils/Component';
import {Icon} from '../../baseComponents/icon/Icon';
import './style.less';
import template from './template.hbs';

export class Burger extends Component {
    public init(): void {
        this.children = {
            burgerIco: new Icon({
                classes: ['burger__ico'],
            })
        }
    }
    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
