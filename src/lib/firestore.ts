import {
  collection,
  doc,
  type CollectionReference,
  type DocumentData,
  type DocumentReference,
} from 'firebase/firestore';
import { db } from './firebase';
import { firestorePrefix } from './env';

/**
 * Resolve a collection reference for the active environment.
 * Always go through this — never call collection(db, name) directly,
 * or you risk reading/writing the wrong env's data.
 */
export function col<T = DocumentData>(name: string): CollectionReference<T> {
  return collection(db, `${firestorePrefix}${name}`) as CollectionReference<T>;
}

export function docRef<T = DocumentData>(name: string, id: string): DocumentReference<T> {
  return doc(db, `${firestorePrefix}${name}`, id) as DocumentReference<T>;
}
