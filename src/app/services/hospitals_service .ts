import { AppDataSource } from "@/config/database";
import { Hospital, Doctor } from "../models";
import { CreateHospitalDto } from "../dto/hospitals/create_hospital_dto";
import { In } from "typeorm";
import { UpdateHospitalDto } from "../dto/hospitals/update_hospital_dto";

export class HospitalService {
  private readonly doctorRepository = AppDataSource.getRepository(Doctor);
  private readonly hospitalRepository = AppDataSource.getRepository(Hospital);

  async createHospital(
    createHospitalDto: CreateHospitalDto
  ): Promise<Hospital> {
    const doctors = await this.doctorRepository.findBy({
      id: In(createHospitalDto.doctorsIds || []),
    });
    const hospital = this.hospitalRepository.create({
      name: createHospitalDto.name,
      doctors,
    });
    const savedHospital = await this.doctorRepository.save(hospital);
    return savedHospital;
  }

  async listAllHospitals(args: {
    perPage: number;
    skip: number;
  }): Promise<Hospital[]> {
    const hospitals = await this.hospitalRepository.find({
      take: args.perPage,
      skip: args.skip,
      relations: {
        doctors: true,
      },
    });
    return hospitals;
  }

  async findOneHospital(id: string): Promise<Hospital | null> {
    const hospital = await this.hospitalRepository.findOne({
      where: { id },
      relations: {
        doctors: true,
      },
    });
    return hospital;
  }

  async updateHospital(id: string, updateHospitalDto: UpdateHospitalDto) {
    const doctors = await this.hospitalRepository.findBy({
      id: In(updateHospitalDto.doctorsIds || []),
    });
    await this.hospitalRepository.update(
      {
        id,
      },
      {
        ...updateHospitalDto,
        doctors,
      }
    );
    return await this.doctorRepository.findOneBy({ id });
  }

  async destroyHospital(id: string) {
    const doctor = await this.hospitalRepository.findOneBy({ id });
    if (!doctor) {
      return null;
    }
    await this.hospitalRepository.delete({ id });
    return doctor;
  }

  async count() {
    const count = await this.hospitalRepository.count();
    return count;
  }
}
