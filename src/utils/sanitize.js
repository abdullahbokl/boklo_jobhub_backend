/**
 * Converts a Mongoose document to a plain object,
 * remapping _id -> id and removing __v
 */
export function sanitizeDoc(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject({ virtuals: false }) : { ...doc };
  const { _id, __v, password, ...rest } = obj;
  if (_id !== undefined) rest.id = _id.toString();
  return rest;
}
export function sanitizeDocs(docs) {
  return docs.map(sanitizeDoc);
}

/**
 * Sanitizes a user document and normalizes profilePic
 * from [{url, uploadedAt}] objects to plain URL strings.
 */
export function sanitizeUser(doc) {
  const plain = sanitizeDoc(doc);
  if (!plain) return null;
  if (Array.isArray(plain.profilePic)) {
    plain.profilePic = plain.profilePic
      .map((p) => (typeof p === "string" ? p : p?.url))
      .filter(Boolean);
  }
  return plain;
}
