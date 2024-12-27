import { deleteOneTeammate } from "../../repository/repo.mjs";
import Component from "../core/Component";

export default class Table extends Component {
  template() {
    const { data, columns } = this.props;
    const tableHead = `<tr>${
      columns.map((column) => `<th>${column.label}</th>`).join("") + `<th></th>`
    }</tr>`;

    const tableBody = data
      .map((datum) => {
        return `<tr>${
          columns.map((column) => `<td>${datum[column.key]}</td>`).join("") +
          `<td>
                <button id="${datum.name}" class="delete-btn">🗑️</button>
          </td>`
        }</tr>`;
      })
      .join("");

    return `
        <table>
            ${tableHead}
            ${tableBody}
        </table>
    `;
  }

  setEventListener() {
    this.addEvent("click", ".delete-btn", async ({ target }) => {
      let val = confirm("정말로 삭제하시겠습니까?");
      if (val) {
        console.log(val, target.id);
        await deleteOneTeammate(target.id);
        window.location.reload();
      }
    });
  }

  style() {
    return `
       table {
            border: 1px #a39485 solid;
            font-size: .9em;
            box-shadow: 0 2px 5px rgba(0,0,0,.25);
            width: 100%;
            border-collapse: collapse;
            border-radius: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-top: 24px;
        }

        th {
            text-align: left;
            font-weight: bold;
            background: #caf0f8;
        }

        td, th {
            padding: 1em .5em;
            vertical-align: middle;
        }

        td {
            border-bottom: 1px solid rgba(0,0,0,.1);
            background: #fff;
        }

        a {
            color: #73685d;
        }

        button {
            background-color: transparent;
            border: none;
            cursor: pointer;
        }
    `;
  }
}
