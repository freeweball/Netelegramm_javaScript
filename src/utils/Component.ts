import {EventBus} from './EventBus';
import {nanoid} from 'nanoid';

export default class Component {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    }

    public id = nanoid(5);
    protected props;
    public children;
    private _eventBus;
    private _element;

    constructor(propsWithChildren) {
        const eventBus = new EventBus();
        const {props, children} = this._getChildrenAndProps(propsWithChildren);

        this.children = children;
        this.props = this._makePropsProxy(props);
        this._eventBus = () => eventBus;
        this._registerEvents(eventBus);

        eventBus.emit(Component.EVENTS.INIT);
    }

    private _getChildrenAndProps(propsWithChildren) {
        const props = {};
        const children = {};

        Object.entries(propsWithChildren).forEach(([key, value]) => {
            value instanceof Component ? children[key] = value : props[key] = value;
        });

        return {props, children};
    }

    private _addEvents() {
        const {events = {}} = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        })
    }

    private _registerEvents(eventBus) {
        eventBus.on(Component.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();
        this._eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    private _componentDidUpdate(oldProps, newProps) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this._eventBus().emit(Component.EVENTS.FLOW_RENDER);
        }
    }

    private _render() {
        const fragment = this.render();
        const newElement = fragment.firstElementChild;

        this._element?.replaceWith(newElement);
        this._element = newElement;
        this._addEvents();
    }

    private _makePropsProxy(props) {
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];

                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = {...target};

                target[prop] = value;
                self._eventBus().emit(Component.EVENTS.FLOW_CDU, oldTarget,target);

                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

    private _replaceStub(temp, component) {
        const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

        if (!stub) {
            return;
        }

        component.getContent()?.append(...Array.from(stub.childNodes));
        stub.replaceWith(component.getContent());
    }

    protected init() {}

    protected componentDidMount() {}

    public dispatchComponentDidMount(): void {
        this._eventBus().emit(Component.EVENTS.FLOW_CDM);
    
        Object.values(this.children).forEach((child: any) => child.dispatchComponentDidMount());
    }

    protected componentDidUpdate(oldProps, newProps) {
        return true;
    }

    protected render() {
        return new DocumentFragment();
    }

    protected compile(template, context) {
        const contextAndStubs = {...context};

        Object.entries(this.children).forEach(([name, component]) => {
            const arr = [];

            if (Array.isArray(component)) {
                component.forEach((el) => {
                    arr.push(`<div data-id="${el.id}"></div>`);
                });

                contextAndStubs[name] = arr;
            } else {
                contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
            }
        });

        const html = template(contextAndStubs);
        const temp = document.createElement('template');

        temp.innerHTML = html;
        
        Object.entries(this.children)
            .forEach(([_, component]) => {
                Array.isArray(component) ? component.forEach((el) => {this._replaceStub(temp, el)}) : this._replaceStub(temp, component);
            });

        return temp.content;
    }

    public setProps(nextProps) {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    public get element() {
        return this._element;
    }

    public getContent() {
        return this.element;
    }

    public show(): void {
        this.getContent()!.style.display = "block";
    }
    
    public hide(): void {
        this.getContent()!.style.display = "none";
    }
}
