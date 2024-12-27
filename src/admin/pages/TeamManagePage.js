import { getAllTeammates } from "../../repository/repo.mjs";

import Table from "../components/Table";
import Component from "../core/Component";

export default class TeamManagePage extends Component {
  setInitialState() {
    this.state = {
      teammates: [],
    };
  }

  template() {
    return `
        <h2>팀원 관리</h2>
        <div data-component="table"></div>
    `;
  }

  mountChild() {
    if (this.state.teammates.length == 0) {
      this.fetchTeammates();
    } else {
      const $table = document.querySelector('[data-component="table"]');
      new Table($table, {
        data: this.state.teammates,
        columns: [
          { label: "이름", key: "name" },
          { label: "나이", key: "age" },
          { label: "자기소개", key: "bio" },
          { label: "TMI", key: "tmi" },
        ],
      });
    }
  }

  async fetchTeammates() {
    let res = await getAllTeammates();
    console.log(res);
    if (res.success) {
      this.setState({ teammates: res.data });
    } else {
      this.setState({ teammates: [] });
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
