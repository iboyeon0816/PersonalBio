import Component from "../core/Component";

export default class Content extends Component {
  setInitialState() {
    const { title } = this.props;
    this.state = { title };
  }

  template() {
    return `
        <h2 class="content-title">Content</h2>
        <div class="content-body">asd</div>
    `;
  }

  style() {
    return `
        .content-title {
            margin: 0px;
            color:rgb(60, 60, 60);
        }

        .content-body {
            width: 90%;
            height: 80%;
            margin: 20px 0;
            padding: 24px 40px;
            border-radius: 16px;
            background-color: #ffffff;
        }
    `;
  }
}
