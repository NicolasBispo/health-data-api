import { DoctorService } from "./doctor_service";
import { getPagination } from "@/helpers/pagination";
import { UpdateDoctorDto, CreateDoctorDto } from "./dtos";
import { FastifyReply, FastifyRequest } from "fastify";

export class DoctorController {
  private readonly doctorService = new DoctorService();

  async index(req: FastifyRequest, res: FastifyReply) {
    const { page, perPage, skip } = getPagination(req);
    const doctors = await this.doctorService.listAllDoctors({ perPage, skip });
    const totalCount = await this.doctorService.count();
    res.send({
      page,
      perPage,
      skip,
      results: doctors,
      totalCount,
    });
  }

  async show(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const doctor = await this.doctorService.findOneDoctor(id);
    if (!doctor) {
      return res.send("Doctor not found");
    }
    return res.send(doctor);
  }

  async create(
    req: FastifyRequest<{ Body: CreateDoctorDto }>,
    res: FastifyReply
  ) {
    const createDoctorDto = req.body;
    const doctor = await this.doctorService.createDoctor(createDoctorDto);
    return res.send(doctor);
  }

  async update(
    req: FastifyRequest<{ Body: UpdateDoctorDto; Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const updateDoctorDto = req.body;
    const doctor = await this.doctorService.updateDoctor(id, updateDoctorDto);
    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }
    return res.send(doctor);
  }

  async destroy(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const doctor = await this.doctorService.destroyDoctor(id);
    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found" });
    }
    return res.send(doctor);
  }
}
