import {nanoid} from 'nanoid';
import Component from '../../../utils/Component';
import {Badge} from '../../baseComponents/badge/Badge';
import {Image} from '../../baseComponents/image/Image';
import {DateAndTime} from '../dateAndTime/DateAndTime';
import {Message} from '../message/Message';
import template from './index.hbs';
import './style.less';

export type ChatItemProps = {
    url: string,
}

export class ChatItem extends Component {
    constructor(props: ChatItemProps) {
        super(props);

        //переделать на получение с сервера
        this.id = nanoid(5);
    }

    public init() {
        console.log(this);
        this.children = {
            image: new Image({
                src: require('../../../../static/img/chatItem-image.jpg'),
                classes: ['chatItem__image'],
            }),
            badge: new Badge({
                value: 1,
                classes: ['chatItem__badge'],
            }),
            message: new Message({
                value: 'last text',
                classes: ['chatItem__text'],
            }),
            dateAndTime: new DateAndTime({
                classes: ['chatItem__time'],
            }),
        }
    }

    public render(): DocumentFragment {
        return this.compile(template, this.props);
    }

    private _setUrl(url: string): void {
        this.props.set(url);
    }
}