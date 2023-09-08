import Component from '../../../utils/Component';
import template from './template.hbs';
import './style.less';

export type ImageProps = {
    src: string,
    alt?: string,
    classes: Array<string>,
}

export class Image extends Component {
    constructor(props: ImageProps) {
        super(props);
    }

    public render() {
        return this.compile(template, this.props);
    }
}