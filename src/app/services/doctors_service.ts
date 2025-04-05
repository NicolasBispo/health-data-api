import { AppDataSource } from "@/config/database";
import { Doctor, Hospital } from "../models";
import { CreateDoctorDto } from "../dto/doctors/create_doctor_dto";
import { In } from "typeorm";

export class DoctorService {
  private readonly doctorRepository = AppDataSource.getRepository(Doctor);
  private readonly hospitalRepository = AppDataSource.getRepository(Hospital);

  async createDoctor(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const hospitals = await this.hospitalRepository.findBy({
      id: In(createDoctorDto.hospitalIds),
    });
    const doctor = this.doctorRepository.create({
      crm: createDoctorDto.crm,
      specialty: createDoctorDto.specialty,
      hospitals,
    });
    const savedDoctor = await this.doctorRepository.save(doctor);
    return savedDoctor;
  }

  async listAllDoctors(args: {
    perPage: number;
    skip: number;
  }): Promise<Doctor[]> {
    const doctors = await this.doctorRepository.find({
      take: args.perPage,
      skip: args.skip,
      relations: {
        hospitals: true,
      },
    });
    return doctors;
  }

  async count() {
    const count = await this.doctorRepository.count();
    return count;
  }
}
