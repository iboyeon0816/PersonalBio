import { addGuestBook, getAllGuestBook, deleteOneGuestBook } from './repository/repo.mjs';

// 방명록 데이터를 화면에 렌더링하는 함수
async function renderGuestBook() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = ''; // 기존 데이터를 초기화

    const response = await getAllGuestBook(); // Firebase에서 데이터 가져오기
    if (response.success) {
        response.data.forEach((entry) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message-item');

            // 방명록 내용
            const messageContent = document.createElement('span');
            messageContent.textContent = `${entry.author}: ${entry.content}`;
            messageDiv.appendChild(messageContent);

            // 삭제 버튼 생성
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제';
            deleteButton.classList.add('delete-button');

            // 삭제 버튼 클릭 이벤트
            deleteButton.addEventListener('click', async () => {
                const isDeleted = await deleteOneGuestBook(entry.author, entry.content);
                if (isDeleted) {
                    alert('메시지가 삭제되었습니다!');
                    renderGuestBook(); // 데이터 갱신
                } else {
                    alert('삭제 실패! 다시 시도해주세요.');
                }
            });

            messageDiv.appendChild(deleteButton);
            messagesDiv.appendChild(messageDiv);
        });
    } else {
        console.error('Failed to fetch guestbook:', response.error);
    }
}

// 방명록 작성 이벤트
document.getElementById('guestbook-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !message) {
        alert('이름과 내용을 입력해주세요!');
        return;
    }

    const isAdded = await addGuestBook(name, message); // Firebase에 저장
    if (isAdded) {
        alert('방명록이 저장되었습니다!');
        renderGuestBook(); // 데이터 갱신
        e.target.reset(); // 폼 초기화
    } else {
        alert('저장 실패! 다시 시도해주세요.');
    }
});

// 초기 데이터 로드
renderGuestBook();