import { CreateDoctorDto } from "../dto/doctors/create_doctor_dto";
import { DoctorService } from "../services/doctors_service";
import { BaseController } from "./base_controller";
import { getPagination } from "../helpers/pagination";
import { UpdateDoctorDto } from "../dto/doctors/update_doctor_dto";

export class DoctorController extends BaseController {
  private readonly doctorService = new DoctorService();

  async findAllDoctors() {
    const { page, perPage, skip } = getPagination(this.req);
    const doctors = await this.doctorService.listAllDoctors({ perPage, skip });
    const totalCount = await this.doctorService.count();
    this.ok({
      page,
      perPage,
      skip,
      results: doctors,
      totalCount,
    });
  }

  async findOneDoctor() {
    const { id } = this.req.params;
    const doctor = await this.doctorService.findOneDoctor(id);
    if (!doctor) {
      return this.notFound("Doctor not found");
    }
    return this.ok(doctor);
  }

  async createDoctor() {
    const createDoctorDto = this.req.body as CreateDoctorDto;
    const doctor = await this.doctorService.createDoctor(createDoctorDto);
    return this.ok(doctor);
  }

  async updateDoctor() {
    const { id } = this.req.params;
    const updateDoctorDto = this.req.body as UpdateDoctorDto;
    const doctor = await this.doctorService.updateDoctor(id, updateDoctorDto);
    if (!doctor) {
      return this.notFound("Doctor not found");
    }
    return this.ok(doctor);
  }

  async destroyDoctor() {
    const { id } = this.req.params;
    const doctor = await this.doctorService.destroyDoctor(id);
    if (!doctor) {
      return this.notFound("Doctor not found");
    }
    return this.ok(doctor);
  }
}
