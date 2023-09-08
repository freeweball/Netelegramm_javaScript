import Component from '../../../utils/Component';
import template from './index.hbs';
import './style.less';

export type MessageProps = {
    value?: string,
    classes?: Array<string>,
}

export class Message extends Component {
    constructor(props: MessageProps) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}