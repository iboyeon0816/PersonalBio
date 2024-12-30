export default class Component {
  $target;
  props;
  state;
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setInitialState();
    this.setEventListener();
    this.render();
  }

  setInitialState() {}
  mountChild() {}
  setEventListener() {}

  style() {
    return "";
  }

  template() {
    return "";
  }

  render() {
    let styles = `<style>${this.style()}</style>`;
    this.$target.innerHTML = styles + this.template();
    this.mountChild();
  }

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
