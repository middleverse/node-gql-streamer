import { ObjectId } from "mongodb";

// Creates a manual reference
// Type ref takes a generic object and resolves
// to the object or objectId type
export type Ref<T> = T | ObjectId;
