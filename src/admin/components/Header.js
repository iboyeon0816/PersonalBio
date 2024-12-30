import Component from "../core/Component";

export default class Headers extends Component {
  template() {
    return `
        <div class="header">
            <h1>열심히하겠조</h1>
            <div class="admin-text">Admin</div>
        </div>
    `;
  }

  style() {
    return `
        .header {
            display: flex;
            align-items: end;
            margin: 0 60px;
        }

        .header > h1 {
            margin: 0px 12px -4px 0px;
            font-size: 26px;
            color: #00B4D8;
        }

        .admin-text {
            color:rgb(161, 161, 161);
            font-size: 14px;
        }
    `;
  }
}
