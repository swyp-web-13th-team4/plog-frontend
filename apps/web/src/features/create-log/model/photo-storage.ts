// TODO: 사진 임시 저장 기능 현재 비활성화 상태, 고도화 시점에 UX 필요성 검토 후 use-photo-upload.ts와 연동

const DB_NAME = 'plog:create-log';
const DB_VERSION = 1;
const PHOTO_STORE_NAME = 'photos';
const PHOTO_STORE_KEY = 'current';

type StoredPhotoFiles = File[];

function canUseIndexedDB() {
  return typeof window !== 'undefined' && 'indexedDB' in window;
}

function openCreateLogPhotoDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (!canUseIndexedDB()) {
      reject(new Error('IndexedDB is not available.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(PHOTO_STORE_NAME)) {
        database.createObjectStore(PHOTO_STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function readPhotoFiles(database: IDBDatabase) {
  return new Promise<StoredPhotoFiles>((resolve, reject) => {
    const transaction = database.transaction(PHOTO_STORE_NAME, 'readonly');
    const store = transaction.objectStore(PHOTO_STORE_NAME);
    const request = store.get(PHOTO_STORE_KEY);

    request.onsuccess = () =>
      resolve((request.result as StoredPhotoFiles) ?? []);
    request.onerror = () => {
      database.close();
      reject(request.error);
    };
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => {
      database.close();
      reject(transaction.error);
    };
  });
}

function writePhotoFiles(database: IDBDatabase, files: StoredPhotoFiles) {
  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(PHOTO_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(PHOTO_STORE_NAME);
    store.put(files, PHOTO_STORE_KEY);

    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error);
    };
  });
}

function deletePhotoFiles(database: IDBDatabase) {
  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(PHOTO_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(PHOTO_STORE_NAME);
    store.delete(PHOTO_STORE_KEY);

    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error);
    };
  });
}

export async function getCreateLogPhotoFiles() {
  if (!canUseIndexedDB()) return [];

  try {
    const database = await openCreateLogPhotoDatabase();
    return await readPhotoFiles(database);
  } catch {
    return [];
  }
}

export async function setCreateLogPhotoFiles(files: StoredPhotoFiles) {
  if (!canUseIndexedDB()) return;

  try {
    const database = await openCreateLogPhotoDatabase();
    await writePhotoFiles(database, files);
  } catch {
    // 사진 임시 저장 실패는 작성 흐름을 막지 않습니다.
  }
}

export async function clearCreateLogPhotoFiles() {
  if (!canUseIndexedDB()) return;

  try {
    const database = await openCreateLogPhotoDatabase();
    await deletePhotoFiles(database);
  } catch {
    // 사진 임시 저장 삭제 실패는 작성 흐름을 막지 않습니다.
  }
}
