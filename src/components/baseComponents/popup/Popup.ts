import Component from '../../../utils/Component';
import template from './index.hbs';
import './style.less';

export type PopupProps = {
    classes: Array<string>,
}

export class Popup extends Component {
    constructor(props: PopupProps) {
        super(props);
    }

    public init() {
        this.children = {
            childrens: [],
        }
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}