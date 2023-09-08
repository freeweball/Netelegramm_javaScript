import Component from '../../../utils/Component';
import template from './index.hbs';
import './style.less';

export type BadgeProps = {
    value?: string | number,
    classes?: Array<string>,
}

export class Badge extends Component {
    constructor(props: BadgeProps) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}