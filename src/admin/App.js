// import { addBioToTeammate } from "../repository/repo.mjs";
import Component from "./core/Component";
import Router from "./core/Router";
import createRoute from "./pages/index";

import Headers from "./components/Header";
import Navbar from "./components/Navbar";

export default class App extends Component {
  setInitialState() {
    this.state = {
      menuItems: [
        { label: "팀원 관리", link: "#/teammates" },
        { label: "방명록 관리", link: "#/guestbooks" },
      ],
    };
  }

  template() {
    return `
        <header locate-component="header"></header>
        <main>
            <div locate-component="navbar"></div>
            <div locate-component="content"></div>
        </main>
      `;
  }

  mountChild() {
    const $header = this.$target.querySelector('[locate-component="header"]');
    const $navbar = this.$target.querySelector('[locate-component="navbar"]');
    const $content = this.$target.querySelector('[locate-component="content"]');
    const pages = createRoute($content);

    new Headers($header);
    new Navbar($navbar, {
      menuItems: this.state.menuItems,
    });
    new Router($content, pages);
  }

  style() {
    return `
        header {
            height: 76px;
            display: flex;
            padding: 0px;
            align-items: center;
        }

        main {
            display: flex;
            flex-direction: row;
            height: 100vh;
            margin: 0;
        }

        main > div[locate-component="navbar"] {
            height: 100%;
            padding: 20px 36px;
            flex: 2;
        }

         main > div[locate-component="content"] {
            padding: 36px 36px;
            background-color:rgb(237, 243, 244);
            flex: 8;
        }
    `;
  }
}
