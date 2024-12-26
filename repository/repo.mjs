import "./firestore.mjs";
import {
  addEntityWithKey,
  addEntityWithoutKey,
  deleteEntityById,
  getAllEntities,
  getEntityByCondition,
  getOneEntity,
} from "./firestore.mjs";

// 모든 방명록 데이터를 가져오는 함수
// 방명록을 생성하는 함수
// 방명록을 삭제하는 함수

/*
 * teammate(팀원) 관련 함수
 * teammate 자료는 다음을 포함합니다.
 * { name: string, age: number, tmi: string, bio: string }
 */

//  팀원의 정보를 데이터베이스에 저장합니다.
//!  name과 age는 반드시 포함하여 호출합니다.
//*  성공시 true, 실패시 false를 반환합니다.
export async function addTeammate(name, age, tmi = "", bio = "") {
  try {
    await addEntityWithKey("teammates", name, { name, age, tmi, bio });
    return true;
  } catch (e) {
    console.error("Failed to add teammate", e);
    return false;
  }
}

//  팀원의 자기소개 글을 데이터베이스에 추가합니다.
//! name과 bio(자기소개)는 반드시 포함하여 호출합니다.
//*  성공시 true, 실패시 false를 반환합니다.
export async function addBioToTeammate(name, bio) {
  try {
    await addEntityWithKey("teammates", name, { bio }, true);
    return true;
  } catch (e) {
    console.error("Failed to add bio", e);
    return false;
  }
}

// 모든 팀원의 정보를 데이터베이스에서 가져옵니다.
//* 반환값의 'success' 프로퍼티를 확인하고 true일때만 data에 접근해야 합니다.
export async function getAllTeammates() {
  try {
    let allTeammates = await getAllEntities("teammates");
    return {
      success: true,
      data: allTeammates,
    };
  } catch (e) {
    return {
      success: false,
      error: e.message,
    };
  }
}

// 팀원 한 명의 정보를 데이터베이스에서 가져옵니다.
//! name을 반드시 포함해서 호출합니다.
//* 반환값의 'success' 프로퍼티를 확인하고 true일때만 data에 접근해야 합니다.
export async function getOneTeammate(name) {
  try {
    let teammate = await getOneEntity("teammates", name);
    return {
      success: true,
      data: teammate,
    };
  } catch (e) {
    return {
      success: false,
      error: e.message,
    };
  }
}

/*
 * guestbook(방명록) 관련 함수
 * guestbook 자료는 다음을 포함합니다.
 * { authorName: string, content: string }
 */

// 방명록을 데이터베이스에 추가합니다.
//! authorName(작성자 이름), content(내용)은 반드시 포함해서 호출합니다.
//* 성공시 true, 실패시 false를 반환합니다.
export async function addGuestBook(author, content) {
  try {
    await addEntityWithoutKey("guestbook", { author, content });
    return true;
  } catch (e) {
    console.error("Failed to add guestbook", e);
    return false;
  }
}

// 모든 방명록을 데이터베이스에서 가져옵니다.
//* 반환값의 'success' 프로퍼티를 확인하고 true일때만 data에 접근해야 합니다.
export async function getAllGuestBook() {
  try {
    let allGuestBook = await getAllEntities("guestbook");
    return {
      success: true,
      data: allGuestBook,
    };
  } catch (e) {
    return {
      success: false,
      error: e.message,
    };
  }
}

// 방명록 하나를 삭제합니다.
//! author와 content를 반드시 포함해서 호출합니다.
//* 성공시 true, 실패시 false를 반환합니다.
export async function deleteOneGuestBook(author, content) {
  try {
    let queryMatchData = await getEntityByCondition("guestbook", [
      { field: "author", operator: "==", value: author },
      { field: "content", operator: "==", value: content },
    ]);
    queryMatchData.forEach(async (datum) => {
      await deleteEntityById("guestbook", datum.id);
    });
    return true;
  } catch (e) {
    console.error("Failed to delete guestbook", e);
    return false;
  }
}

// 테스트 함수
$("#repo").on("click", async (event) => {
  //   await deleteEntityById("guestbook", "lvgN7vmmzLKoWJSxhKPe");
  //   await addGuestBook("abc123", "do my best!");
  //   await addGuestBook("abc123", "do my best!");
  //   await addGuestBook("abc123", "do my best!");
  //   await deleteOneGuestBook("abc123", "do my best!");
  let a = await addBioToTeammate("Spartan", "안녕 나는 르탄이.");
  console.log(a);
});
