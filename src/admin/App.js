// import { addBioToTeammate } from "../repository/repo.mjs";

import Component from "./core/Component";

import Content from "./components/Content";
import Headers from "./components/Header";
import Navbar from "./components/navbar";

// $("body").on("click", async (event) => {
//   await addBioToTeammate();
// });
export default class App extends Component {
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

    new Headers($header);
    new Navbar($navbar);
    new Content($content);
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
