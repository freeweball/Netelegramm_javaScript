import Component from '../../utils/Component';
import template from './template.hbs';
import './style.less';
import {Aside} from '../../components/customComponents/aside/aside';
import {Chat} from '../../components/customComponents/chat/Chat';

export class MainPage extends Component {
    public init(): void {
        this.children = {
            aside: new Aside({}),
            chat: new Chat({})
        }
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}