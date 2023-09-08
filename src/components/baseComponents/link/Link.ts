import Component from '../../../utils/Component';
import template from './index.hbs';
import './style.less';

export type LinkProps = {
    href?: string,
    classes?: Array<string>,
}

export class Link extends Component {
    public render() {
        return this.compile(template, this.props);
    }
}