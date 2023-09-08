import './style.less';
import Component from '../../utils/Component';
import template from './template.hbs';

export class Page500 extends Component {
    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
