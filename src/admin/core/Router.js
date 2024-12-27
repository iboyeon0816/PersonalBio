import Component from "./Component";

export default class Router extends Component {
  constructor($target, routes) {
    super($target);
    this.state.routes = [...this.state.routes, ...routes];
    this.startRoute();
  }
  setInitialState() {
    this.state = { routes: [] };
  }

  checkRoutes() {
    // console.log(this.state.routes);
    const currentRoute = this.state.routes.find(
      ({ path }) => path === window.location.hash
    );
    if (!currentRoute) {
      window.location.href = "./#/teammates";
      this.state.routes[0].component();
      return;
    }
    currentRoute.component();
  }

  startRoute() {
    window.addEventListener("hashchange", (e) => this.checkRoutes());
    if (!window.location.hash) {
      window.location.hash = "#/teammates";
    }
    this.checkRoutes();
  }
}
