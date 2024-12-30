import {
  deleteGuestbookById,
  getAllGuestBook,
} from "../../repository/repo.mjs";

import Table from "../components/Table";
import Component from "../core/Component";

export default class TeamManagePage extends Component {
  setInitialState() {
    this.state = {
      guestbook: [],
    };
  }

  template() {
    return `
        <h2>방명록 관리</h2>
        <div data-component="table"></div>
    `;
  }

  mountChild() {
    if (this.state.guestbook.length == 0) {
      this.fetchGuestbook();
    } else {
      const $table = document.querySelector('[data-component="table"]');
      new Table($table, {
        data: this.state.guestbook,
        columns: [
          { label: "작성자", key: "author" },
          { label: "내용", key: "content" },
        ],
        createDeleteBtn: (btnId) =>
          `<button id=${btnId} class="delete-btn">🗑️</button>`,
        onclickDelete: deleteGuestbookById,
      });
    }
  }

  async fetchGuestbook() {
    let res = await getAllGuestBook();
    console.log(res);
    if (res.success) {
      this.setState({ guestbook: res.data });
    } else {
      this.setState({ guestbook: [] });
    }
  }

  style() {
    return `
        h2 {
            margin: 0px;
        }
    `;
  }
}
