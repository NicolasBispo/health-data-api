import { PatientService } from "./patient_service";
import { getPagination } from "@/helpers/pagination";
import { UpdatePatientDto, CreatePatientDto } from "./dtos";
import { FastifyRequest, FastifyReply } from "fastify";

export class PatientsController {
  private readonly patientService = new PatientService();

  async index(req: FastifyRequest, res: FastifyReply) {
    const { page, perPage, skip } = getPagination(req);
    const patients = await this.patientService.listAllPatients({
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
    const patient = await this.patientService.findOnePatient(id);
    if (!patient) {
      return res.status(404).send({ message: "Hospital not found" });
    }
    return res.send(patient);
  }

  async create(
    req: FastifyRequest<{ Body: CreatePatientDto }>,
    res: FastifyReply
  ) {
    const createHospitalDto = req.body;
    const patient = await this.patientService.createPatient(createHospitalDto);
    return res.send(patient);
  }

  async update(
    req: FastifyRequest<{ Body: UpdatePatientDto; Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const updateHospitalDto = req.body;
    const patient = await this.patientService.updatePatient(
      id,
      updateHospitalDto
    );
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
    const patient = await this.patientService.destroyPatient(id);
    if (!patient) {
      return res.status(404).send({ message: "Hospital not found" });
    }
    return res.send(patient);
  }
}
