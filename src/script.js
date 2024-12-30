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
  
  
  document.addEventListener('DOMContentLoaded', async function () {
    try {
      const response = await getAllTeammates();
  
      if (response.success) {
        const teamMembers = response.data;
        const teamContainer = document.querySelector('.team-container');
  
        teamContainer.innerHTML = ''; // 기존 팀원 데이터 초기화
  
        teamMembers.forEach(member => {
          const memberDiv = document.createElement('div');
          memberDiv.classList.add('team-member');
  
          // 이미지 생성하기
          const memberImg = document.createElement('img');
          memberImg.src = member.imageUrl || 'https://picsum.photos/350/350/?image=1';
          memberImg.alt = member.name;
          memberDiv.appendChild(memberImg);
  
          // 직책 생성 및 추가하기
          const memberRank = document.createElement('div');
          memberRank.classList.add('member-info');
  
          const roleSpan = document.createElement('span');
          roleSpan.classList.add('role');
          roleSpan.textContent = member.role || '팀원';
          memberRank.appendChild(roleSpan);
  
          const memberName = document.createElement('span');
          memberName.classList.add('member-name');
          memberName.textContent = member.name || '이름 없음';
          memberRank.appendChild(memberName);
  
          const memberAge = document.createElement('span');
          memberAge.classList.add('member-age');
          memberAge.textContent = member.age || '정보 없음';
          memberRank.appendChild(document.createTextNode(` (${memberAge.textContent})`));
  
          memberDiv.appendChild(memberRank);
  
          // 팀원 카드 div를 팀원 컨테이너에 추가
          teamContainer.appendChild(memberDiv);
        });
      } else {
        console.error('Failed to fetch team members:', response.error);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  });

  function openModal(teamMemberName) {
    alert('teamMemberRank' + teamMemberName + '모달창 실행.')
  }