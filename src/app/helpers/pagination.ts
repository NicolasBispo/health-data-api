import { Request } from "express";
export function getPagination(request: Request) {
  const page = request.query.page ? Number(request.query.page) : 1;
  const limit = request.query.limit ? Number(request.query.limit) : 10;
  const offset = (page - 1) * limit;

  return { page, perPage: limit, skip: offset };
}
