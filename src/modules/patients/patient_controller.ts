import { CreateHospitalDto } from "../dto/hospitals/create_hospital_dto";
import { HospitalService } from "../services/hospitals_service ";
import { getPagination } from "@/helpers/pagination";
import { UpdateHospitalDto } from "../dto/hospitals/update_hospital_dto";
import { FastifyRequest, FastifyReply } from "fastify";

export class HospitalsController {
  private readonly hospitalService = new HospitalService();

  async index(req: FastifyRequest, res: FastifyReply) {
    const { page, perPage, skip } = getPagination(req);
    const hospitals = await this.hospitalService.listAllHospitals({
      perPage,
      skip,
    });
    const totalCount = await this.hospitalService.count();
    return res.send({
      page,
      perPage,
      totalCount,
      results: hospitals,
    });
  }

  async show(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const hospital = await this.hospitalService.findOneHospital(id);
    if (!hospital) {
      return res.status(404).send({ message: "Hospital not found" });
    }
    return res.send(hospital);
  }

  async create(
    req: FastifyRequest<{ Body: CreateHospitalDto }>,
    res: FastifyReply
  ) {
    const createHospitalDto = req.body;
    const hospital = await this.hospitalService.createHospital(
      createHospitalDto
    );
    return res.send(hospital);
  }

  async update(
    req: FastifyRequest<{ Body: UpdateHospitalDto; Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const updateHospitalDto = req.body;
    const hospital = await this.hospitalService.updateHospital(
      id,
      updateHospitalDto
    );
    if (!hospital) {
      return res.status(404).send({ message: "Hospital not found" });
    }
    return res.send(hospital);
  }

  async destroy(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const hospital = await this.hospitalService.destroyHospital(id);
    if (!hospital) {
      return res.status(404).send({ message: "Hospital not found" });
    }
    return res.send(hospital);
  }
}
