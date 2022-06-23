import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export async function uploadImageToStorage(file, folderName) {
  var result = null;
  const storage = getStorage();
  const storageRef = ref(storage, `/${folderName}/${uuidv4()}`);
  const snapshot = await uploadBytes(storageRef, file);
  result = getDownloadURL(snapshot.ref);
  return result;
}

export function deleteImageFromStorage(imgURL) {
  const storage = getStorage();
  const storageRef = ref(storage, imgURL);
  deleteObject(storageRef);
}
