import { AppDataSource } from "@/config/database";
import { Doctor, Hospital } from "../models";
import { CreateDoctorDto } from "../dto/doctors/create_doctor_dto";
import { In } from "typeorm";
import { UpdateDoctorDto } from "../dto/doctors/update_doctor_dto";

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

  async findOneDoctor(id: string): Promise<Doctor | null> {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: {
        hospitals: true,
      },
    });
    return doctor;
  }

  async updateDoctor(id: string, updateDoctorDto: UpdateDoctorDto) {
    await this.doctorRepository.update(
      {
        id,
      },
      {
        ...updateDoctorDto,
      }
    );
    return await this.doctorRepository.findOneBy({ id });
  }

  async destroyDoctor(id: string) {
    const doctor = await this.doctorRepository.findOneBy({ id });
    if (!doctor) {
      return null;
    }
    await this.doctorRepository.delete({ id });
    return doctor;
  }

  async count() {
    const count = await this.doctorRepository.count();
    return count;
  }
}
