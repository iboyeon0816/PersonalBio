import GuestbookManagePage from "./GuestbookManagePage";
import TeamManagePage from "./TeamManagePage";

export default (target) => {
  const teamManage = () => new TeamManagePage(target);
  const guestBookManage = () => new GuestbookManagePage(target);

  return [
    { path: "#/teammates", component: teamManage },
    { path: "#/guestbooks", component: guestBookManage },
  ];
};
