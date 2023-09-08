import Component from '../../../utils/Component';
import './style.less';
import template from './template.hbs';

export class Chat extends Component {
    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
