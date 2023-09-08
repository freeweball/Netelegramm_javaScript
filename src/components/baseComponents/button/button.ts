import Component from '../../../utils/Component';
import template from './button.hbs';
import './style.less';

export type ButtonProps = {
    type: string,
    name?: string,
    disabled?: 'disabled' | '',
    classes?: Array<string>,
    events?: {
        click: (evt: Event) => void,
    }
}

export class Button extends Component {
    constructor(props: ButtonProps) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
