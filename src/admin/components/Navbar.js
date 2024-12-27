import Component from "../core/Component";

export default class Navbar extends Component {
  setInitialState() {
    const { menuItems } = this.props;
    this.state = {
      menuItems: [
        { label: "팀원 관리", link: "#팀원" },
        { label: "방명록 관리", link: "#방명록" },
        { label: "뭐하지?", link: "#뭐하지" },
      ],
    };
  }

  template() {
    const { menuItems } = this.state;

    return `
        <li class="nav-bar">
            ${menuItems
              .map(
                (item) => `<ul><a href="${item.link}">${item.label}</a></ul>`
              )
              .join("")}
        </li>
    `;
  }

  style() {
    return `
        .nav-bar {
            list-style:none;
        }
        .nav-bar > ul {
            padding: 10px 20px;
            margin-bottom: 18px;
            border-radius: 14px;
            background-color: #00B4D8;

        }
        .nav-bar > ul > a {
            text-decoration: none;
            font-size: 14px;
            color:rgb(238, 238, 238);
        }
    `;
  }
}
