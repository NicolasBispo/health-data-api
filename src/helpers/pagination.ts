import { FastifyRequest } from "fastify";

export function getPagination(request: FastifyRequest) {
  const query = request.query as { page?: string; limit?: string };
  const page = query.page ? Number(query.page) : 1;
  const limit = query.limit ? Number(query.limit) : 10;
  const offset = (page - 1) * limit;

  return { page, perPage: limit, skip: offset };
}
