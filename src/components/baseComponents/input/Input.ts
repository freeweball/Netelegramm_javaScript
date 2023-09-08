import Component from '../../../utils/Component';
import template from './index.hbs';
import './style.less';

export type InputProps = {
    type: string,
    placeholder?: string,
    classes?: Array<string>,
    name?: string,
    events: {
        input: (evt: Event) => void,
    }
}

export class Input extends Component {
    constructor(props: InputProps) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}