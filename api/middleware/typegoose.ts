import { Model, Document } from "mongoose";
import { getClassForDocument } from "@typegoose/typegoose";
import { MiddlewareFn } from "type-graphql";

export const TypegooseMiddleware: MiddlewareFn = async (_, next) => {
  const result = await next();

  // 1. Array of objects
  if (Array.isArray(result)) {
    return result.map((item) =>
      item instanceof Model ? convertDocument(item) : item
    );
  }

  // 2. A) Single object that needs conversion
  if (result instanceof Model) {
    return convertDocument(result);
  }

  // 2. B) Single object that doesn't need conversion
  return result;
};

function convertDocument(doc: Document) {
  const convertedDocument = doc.toObject();
  const DocumentClass = getClassForDocument(doc)!;

  Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);
}
