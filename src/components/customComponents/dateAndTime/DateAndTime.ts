import Component from '../../../utils/Component';
import template from './index.hbs';
import './style.less';

export type DateAndTimeProps = {
    value?: string,
    classes?: Array<string>,
}

export class DateAndTime extends Component {
    constructor(props: DateAndTimeProps) {
        super(props);
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    init() {
        this.setProps({value: this.getDate()})
    }

    getTime(): string {
        const date = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
        }

        return date.toLocaleString("ru", options);
    }

    getDay():string {
        const date = new Date();
        const options = {
            weekday: 'short',
        }

        return date.toLocaleString("ru", options);
    }

    getDate(): string {
        const date = new Date();
        const options = {
            month: 'long',
            day: 'numeric',
        }

        return date.toLocaleString("ru", options);
    }
}