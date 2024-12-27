import { getAllTeammates } from './repository/repo.mjs';

document
  .getElementById("guestbook-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    const messageDiv = document.createElement("div");
    messageDiv.textContent = `${name}: ${message}`;

    document.getElementById("messages").appendChild(messageDiv);

    // 폼 초기화
    e.target.reset();
  });

  async function fetchTeammates() {
    const response = await getAllTeammates();
  
    if (response.success) {
      const teammates = response.data;
      console.log('팀원 불러오기 성공', teammates);
      return teammates;
    } else {
      console.error("오류 발생:", response.error);
      return null;
    }
  }
  
  const teammates = await fetchTeammates();
  
  // 임시로 버튼 생성
  const buttonContainer = $('#temp-button-container');
  teammates.forEach((teammate) => {
    if ('name' in teammate && teammate.name !== undefined) {
      const button = $(`
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#teamModal">
          ${teammate.name}
        </button>
      `);
    
      button.on('click', function() {
        $('#modal-name').text(teammate.name);
        $('#modal-bio').text(teammate.bio);
        $('#modal-tmi').text(teammate.tmi);
      });
    
      buttonContainer.append(button);
    }
  });