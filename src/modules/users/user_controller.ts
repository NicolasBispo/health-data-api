import { UserService } from "./user_service";
import { getPagination } from "@/helpers/pagination";
import { UpdateUserDto, CreateUserDto } from "./dtos";
import { FastifyRequest, FastifyReply } from "fastify";

export class UsersController {
  private readonly patientService = new UserService();

  async index(req: FastifyRequest, res: FastifyReply) {
    const { page, perPage, skip } = getPagination(req);
    const patients = await this.patientService.listAllUsers({
      perPage,
      skip,
    });
    const totalCount = await this.patientService.count();
    return res.send({
      page,
      perPage,
      totalCount,
      results: patients,
    });
  }

  async show(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const patient = await this.patientService.findOneUser(id);
    if (!patient) {
      return res.status(404).send({ message: "Hospital not found" });
    }
    return res.send(patient);
  }

  async create(
    req: FastifyRequest<{ Body: CreateUserDto }>,
    res: FastifyReply
  ) {
    const createHospitalDto = req.body;
    const patient = await this.patientService.createUser(createHospitalDto);
    return res.send(patient);
  }

  async update(
    req: FastifyRequest<{ Body: UpdateUserDto; Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const updateHospitalDto = req.body;
    const patient = await this.patientService.updateUser(id, updateHospitalDto);
    if (!patient) {
      return res.status(404).send({ message: "Hospital not found" });
    }
    return res.send(patient);
  }

  async destroy(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const patient = await this.patientService.destroyUser(id);
    if (!patient) {
      return res.status(404).send({ message: "Hospital not found" });
    }
    return res.send(patient);
  }
}
