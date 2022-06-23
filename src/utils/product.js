import { app } from "./firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export async function fetchAllProduct(collectionName) {
  const db = getFirestore(app);
  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);
  const result = await Promise.all(
    snapshot.docs.map(async (doc) => {
      var data = doc.data();
      var categoryName = await findCategoryNameByID(
        "category",
        data.categoryID
      );
      data.categoryName = categoryName;
      return data;
    })
  );
  return result;
}

async function findCategoryNameByID(collectionName, categoryID) {
  const db = getFirestore(app);
  const col = collection(db, collectionName);
  const queryCol = query(col, where("id", "==", categoryID));
  const snapshot = await getDocs(queryCol);
  var data = snapshot.docs[0].data();
  return data.name;
}

export async function fetchProductInfoByID(collectionName, productID) {
  const db = getFirestore(app);
  const col = collection(db, collectionName);
  const queryCol = query(col, where("productID", "==", productID));
  const snapshot = await getDocs(queryCol);
  var data = snapshot.docs[0].data();
  return data;
}
