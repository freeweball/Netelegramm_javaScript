import Component from '../../../utils/Component'
import './style.less';
import template from './template.hbs';

export type IconProps = {
    classes?: Array<string>,
}

export class Icon extends Component {
    constructor(props: IconProps) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}