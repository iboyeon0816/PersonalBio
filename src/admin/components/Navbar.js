import Component from "../core/Component";

export default class Navbar extends Component {
  setInitialState() {
    const { menuItems } = this.props;
    this.state = {
      menuItems,
      currentPage: window.location.hash.replace("#/", ""),
    };
  }

  template() {
    const { menuItems } = this.state;

    return `
        <ul class="nav-bar">
            ${menuItems
              .map((item) => {
                const currentId = item.link.replace("#/", "");
                const currentPage =
                  currentId === this.state.currentPage ? "currentPage" : "";
                return `
                  <li id=${currentId} class=${currentPage}>
                      <a href="${item.link}">${item.label}</a>
                  </li>
                `;
              })
              .join("")}
        </ul>
    `;
  }

  setEventListener() {
    window.addEventListener("hashchange", () => {
      this.setState({ currentPage: window.location.hash.replace("#/", "") });
      console.log(this.state.currentPage);
      this.setCurrentPageClass();
    });
  }

  setCurrentPageClass() {
    let elements = document.querySelectorAll("li");

    elements.forEach((element) => {
      if (element.id === this.state.currentPage) {
        element.classList.add("currentPage");
      } else {
        element.classList.remove("currentPage");
      }
    });
  }

  style() {
    return `
        .nav-bar {
            list-style:none;
            padding: 0px;
        }
        .nav-bar > li {
            padding: 10px 20px;
            margin-bottom: 18px;
            border-radius: 14px;

        }

        .currentPage {
          background-color: #00B4D8;
        }

        .currentPage > a {
          color: white;
        }

        li > a {
            text-decoration: none;
            font-size: 14px;
            color: black;
        }


    `;
  }
}
