import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

/**
 * Storage path conventions:
 *  - Capability video:    capabilities/<capabilityId>/videos/<filename>.mp4
 *  - Capability poster:   capabilities/<capabilityId>/posters/<filename>.jpg
 *  - Capability thumb:    capabilities/<capabilityId>/thumbs/<filename>.jpg
 *
 * NOTE: Storage paths are NOT environment-prefixed. Environment isolation
 * for media should be handled by using separate Storage buckets per
 * Firebase project, OR by prefixing the top-level folder. We default to
 * a single shared bucket because demo videos are content, not user data.
 * Revisit if dev/test pollution becomes a concern.
 */

/** Resolve a Firebase Storage path to a download URL. */
export function resolveVideoUrl(path: string): Promise<string> {
  if (!path) return Promise.reject(new Error('resolveVideoUrl: empty path'));
  return getDownloadURL(ref(storage, path));
}

/** Alias. Same logic, distinct intent for image assets. */
export const resolveImageUrl = resolveVideoUrl;

/**
 * Upload a file to a given Storage path. Admin-only, protected by
 * storage.rules. Returns the resolved download URL on success.
 */
export async function uploadFile(path: string, file: File | Blob): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

/**
 * Helpers for building canonical storage paths. Use these instead of
 * concatenating strings inline so the convention stays consistent.
 */
export const path = {
  capabilityVideo: (capabilityId: string, filename: string) =>
    `capabilities/${capabilityId}/videos/${filename}`,
  capabilityPoster: (capabilityId: string, filename: string) =>
    `capabilities/${capabilityId}/posters/${filename}`,
  capabilityThumb: (capabilityId: string, filename: string) =>
    `capabilities/${capabilityId}/thumbs/${filename}`,
};
