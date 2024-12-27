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

  async function initializePage() {
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
      
    if (!teammates) {
      alert("팀원 정보를 불러오는 데 실패했습니다.");
      return;
    }
  
    // 버튼 생성
    const buttonContainer = $('#temp-button-container');
    buttonContainer.empty(); 
  
    teammates.forEach((teammate) => {
      if ('name' in teammate && teammate.name !== undefined) {
        const button = $(`
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#teamModal">
            ${teammate.name}
          </button>
        `);
      
        button.on('click', function() {
          $('#modal-name').text(teammate.name || '이름 없음');
          $('#modal-bio').text(teammate.bio || '자기소개 없음');
          $('#modal-tmi').text(teammate.tmi || 'TMI 없음');
        });
      
        buttonContainer.append(button);
      }
    });
  }
  
  // 페이지 로드 시 실행
  $(document).ready(function() {
    initializePage();
  });
  