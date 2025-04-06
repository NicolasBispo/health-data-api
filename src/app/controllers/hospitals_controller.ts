import { CreateHospitalDto } from "../dto/hospitals/create_hospital_dto";
import { HospitalService } from "../services/hospitals_service ";
import { BaseController } from "./base_controller";
import { getPagination } from "../helpers/pagination";
import { UpdateHospitalDto } from "../dto/hospitals/update_hospital_dto";

export class HospitalsController extends BaseController {
  private readonly hospitalService = new HospitalService();

  async findAllHospitals() {
    const { page, perPage, skip } = getPagination(this.req);
    const hospitals = await this.hospitalService.listAllHospitals({
      perPage,
      skip,
    });
    const totalCount = await this.hospitalService.count();
    this.ok({
      page,
      perPage,
      totalCount,
      results: hospitals,
    });
  }

  async findOneHospital() {
    const { id } = this.req.params;
    const hospital = await this.hospitalService.findOneHospital(id);
    if (!hospital) {
      return this.notFound("Hospital not found");
    }
    return this.ok(hospital);
  }

  async createHospital() {
    const createHospitalDto = this.req.body as CreateHospitalDto;
    const hospital = await this.hospitalService.createHospital(
      createHospitalDto
    );
    return this.ok(hospital);
  }

  async updateHospital() {
    const { id } = this.req.params;
    const updateHospitalDto = this.req.body as UpdateHospitalDto;
    const hospital = await this.hospitalService.updateHospital(
      id,
      updateHospitalDto
    );
    if (!hospital) {
      return this.notFound("Hospital not found");
    }
    return this.ok(hospital);
  }

  async destroyHospital() {
    const { id } = this.req.params;
    const hospital = await this.hospitalService.destroyHospital(id);
    if (!hospital) {
      return this.notFound("Hospital not found");
    }
    return this.ok(hospital);
  }
}
