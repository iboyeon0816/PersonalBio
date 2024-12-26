import { firebaseConfig } from "./key.dev.mjs";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addEntityWithKey(document, key, entity, merge = false) {
  const entityRef = doc(db, document, key);
  await setDoc(entityRef, { entity }, { merge });
}

export async function addEntityWithoutKey(document, entity) {
  const entityRef = doc(collection(db, document));
  const randomId = entityRef.id;
  await setDoc(entityRef, {
    id: randomId,
    ...entity,
  });
}

export async function getAllEntities(document) {
  const entityRef = collection(db, document);
  const entitySnap = await getDocs(entityRef);
  return entitySnap.docs.map((doc) => doc.data());
}

export async function getOneEntity(document, key) {
  const entityRef = doc(db, document, key);
  const entitySnap = await getDoc(entityRef);
  return entitySnap.data();
}

export async function getEntityByCondition(field, conditions) {
  let collectionRef = collection(db, field);
  let queryRef;
  if (Array.isArray(conditions)) {
    queryRef = query(
      collectionRef,
      ...conditions.map((c) => where(c.field, c.operator, c.value))
    );
  } else {
    queryRef = query(
      collectionRef,
      where(conditions.field, conditions.operator, conditions.value)
    );
  }
  let querySnapshot = await getDocs(queryRef);
  return querySnapshot.docs.map((doc) => doc.data());
}

export async function deleteEntityById(document, id) {
  const entityRef = doc(db, document, id);
  await deleteDoc(entityRef);
}
