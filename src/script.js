import {
  addGuestBook,
  deleteOneGuestBook,
  getAllGuestBook,
  getAllTeammates,
} from "./repository/repo.mjs";

// 방명록 데이터를 화면에 렌더링하는 함수
async function renderGuestBook() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = ""; // 기존 데이터를 초기화

  const response = await getAllGuestBook(); // Firebase에서 데이터 가져오기
  if (response.success) {
    response.data.forEach((entry) => {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message-item");

      // 방명록 내용
      const messageContent = document.createElement("span");
      messageContent.textContent = `${entry.author}: ${entry.content}`;
      messageDiv.appendChild(messageContent);

      // 삭제 버튼 생성
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "삭제";
      deleteButton.classList.add("delete-button");

      // 삭제 버튼 클릭 이벤트
      deleteButton.addEventListener("click", async () => {
        const isDeleted = await deleteOneGuestBook(entry.author, entry.content);
        if (isDeleted) {
          alert("메시지가 삭제되었습니다!");
          renderGuestBook(); // 데이터 갱신
        } else {
          alert("삭제 실패! 다시 시도해주세요.");
        }
      });

      messageDiv.appendChild(deleteButton);
      messagesDiv.appendChild(messageDiv);
    });
  } else {
    console.error("Failed to fetch guestbook:", response.error);
  }
}

// 방명록 작성 이벤트
document
  .getElementById("guestbook-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !message) {
      alert("이름과 내용을 입력해주세요!");
      return;
    }

    const isAdded = await addGuestBook(name, message); // Firebase에 저장
    if (isAdded) {
      alert("방명록이 저장되었습니다!");
      renderGuestBook(); // 데이터 갱신
      e.target.reset(); // 폼 초기화
    } else {
      alert("저장 실패! 다시 시도해주세요.");
    }
  });

document
  .getElementById("guestbook-form")
  .addEventListener("submit", function (e) {
    // 폼 초기화
    e.target.reset();
  });

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await getAllTeammates();

    if (response.success) {
      const teamMembers = response.data;
      const teamContainer = document.querySelector(".team-container");

      teamContainer.innerHTML = ""; // 기존 팀원 데이터 초기화

      teamMembers.forEach((member) => {
        const memberDiv = document.createElement("div");
        memberDiv.classList.add("team-member");

        // 이미지 생성하기
        const memberImg = document.createElement("img");
        memberImg.src =
          member.imageUrl || "https://picsum.photos/350/350/?image=1";
        memberImg.alt = member.name;
        memberDiv.appendChild(memberImg);

        // 직책 생성 및 추가하기
        const memberRank = document.createElement("div");
        memberRank.classList.add("member-info");

        const roleSpan = document.createElement("span");
        roleSpan.classList.add("role");
        roleSpan.textContent = member.role || "팀원";
        memberRank.appendChild(roleSpan);

        const memberName = document.createElement("span");
        memberName.classList.add("member-name");
        memberName.textContent = member.name || "이름 없음";
        memberRank.appendChild(memberName);

        const memberAge = document.createElement("span");
        memberAge.classList.add("member-age");
        memberAge.textContent = member.age || "정보 없음";
        memberRank.appendChild(
          document.createTextNode(` (${memberAge.textContent})`)
        );

        memberDiv.appendChild(memberRank);

        memberDiv.setAttribute("data-bs-toggle", "modal");
        memberDiv.setAttribute("data-bs-target", "#teamModal");

        // 팀원 카드 div를 팀원 컨테이너에 추가
        teamContainer.appendChild(memberDiv);

        memberDiv.addEventListener("click", function () {
          $("#modal-name").text(member.name || "이름 없음");
          $("#modal-bio").text(member.bio || "자기소개 없음");
          $("#modal-tmi").text(member.tmi || "TMI 없음");
          $("#modal-github-link").attr("href", member.gitUrl || "#");
          $("#modal-blog-link").attr("href", member.blogUrl || "#");
        });
      });
    } else {
      console.error("Failed to fetch team members:", response.error);
    }
  } catch (error) {
    console.error("Error fetching team members:", error);
  }
});

function openModal(teamMemberName) {
  alert("teamMemberRank" + teamMemberName + "모달창 실행.");
}

// 초기 데이터 로드
renderGuestBook();
