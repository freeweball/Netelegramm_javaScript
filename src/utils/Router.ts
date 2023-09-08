function isEqual(lhs, rhs) {
    return lhs === rhs;
}

function render(query, component) {
    const root = document.querySelector(query);
  
    if (root === null) {
      throw new Error(`root not found by selector "${query}"`);
    }
  
    root.innerHTML = '';
    root.append(component.getContent()!);
  
    return root;
  }

class Route {
    private _component;
    private _pathname;
    private _componentClass;
    private _query;

    constructor(pathname, componentClass, query) {
        this._pathname = pathname;
        this._componentClass = componentClass;
        this._query = query;
    }

    leave() {
        this._component = null;
    }

    match(pathname) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._component) {
            this._component = new this._componentClass({});

            return render(this._query, this._component);
        }
    }
}

class Router {
    private static _instance;
    private _routes;
    private _currentRoute;
    private _history = window.history;
    private _rootQuery;

    constructor(rootQuery) {
        if (Router._instance) {
            return Router._instance;
        }

        this._routes = [];
        this._rootQuery = rootQuery;
        Router._instance = this;
    }

    public use(pathname, component) {
        const route = new Route(pathname, component, this._rootQuery);
        this._routes.push(route);

        return this;
    }

    public start() {
        window.onpopstate = (event) => {
            this._onRoute(event.currentTarget.location.pathname);
        }

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname) {
        const route = this._getRoute(pathname);

        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    public go(pathname) {
        this._history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back() {
        this._history.back();
    }

    public forward() {
        this._history.forward();
    }

    private _getRoute(pathname) {
        return this._routes.find((route) => route.match(pathname));
    }
}

export default new Router('#app');