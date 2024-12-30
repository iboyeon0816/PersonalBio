import Component from "../core/Component";

export default class Table extends Component {
  template() {
    const { data, columns, createDeleteBtn } = this.props;
    const tableHead = `<tr>${
      columns.map((column) => `<th>${column.label}</th>`).join("") + `<th></th>`
    }</tr>`;

    const tableBody = data
      .map((datum) => {
        return `<tr>${
          columns.map((column) => `<td>${datum[column.key]}</td>`).join("") +
          `<td width="10%">
                ${createDeleteBtn(datum.id)}
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
    const { onclickDelete } = this.props;

    this.addEvent("click", ".delete-btn", async ({ target }) => {
      let val = confirm("정말로 삭제하시겠습니까?");
      if (val) {
        await onclickDelete(target.id);
        console.log(target.id);
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
            max-width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
