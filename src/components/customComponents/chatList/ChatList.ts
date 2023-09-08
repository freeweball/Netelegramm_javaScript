import Component from '../../../utils/Component';
import {ChatItem} from '../chatItem/ChatItem';
import template from './index.hbs';
import './style.less';

export type ChatListProps = {
    classes?: Array<string>,
}

export class ChatList extends Component {
    constructor(props: ChatListProps) {
        super(props);
    }

    public init() {
        this.children = {
            childrens: [
                new ChatItem({
                    url: '#',
                }),
                new ChatItem({
                    url: '#',
                })
            ],
        }
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}