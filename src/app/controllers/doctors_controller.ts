import { AppDataSource } from "@/config/database";
import { Doctor, Hospital } from "../models";
import { CreateDoctorDto } from "../dto/doctors/create_doctor_dto";
import { In } from "typeorm";
import { DoctorService } from "../services/doctors_service";
import { BaseController } from "./base_controller";
import { getPagination } from "../helpers/pagination";
import { ListPaginatedDoctorsDto } from "../dto/doctors/view_doctors_dto";

export class DoctorController extends BaseController {
  private readonly doctorService = new DoctorService();

  async findAllDoctors() {
    const { page, perPage, skip } = getPagination(this.req);
    const doctors = await this.doctorService.listAllDoctors({ perPage, skip });
    const totalCount = await this.doctorService.count();
    this.ok(
      new ListPaginatedDoctorsDto({
        page,
        perPage,
        totalCount,
        results: doctors.map((doctor) => ({
          ...doctor,
          createdAt: doctor.createdAt,
          updatedAt: doctor.updatedAt,
          hospitals: doctor.hospitals.map((hospital) => ({
            id: hospital.id,
            name: hospital.name,
            createdAt: hospital.createdAt,
            updatedAt: hospital.updatedAt,
          })),
        })),
      })
    );
  }
}
