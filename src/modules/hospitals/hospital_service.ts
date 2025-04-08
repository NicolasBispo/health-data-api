import { AppDataSource } from "@/config/database";
import { Doctor } from "@modules/doctors/doctor_entity";
import { Hospital } from "@modules/hospitals/hospital_entity";
import { CreateHospitalDto, UpdateHospitalDto } from "./dtos";
import { In } from "typeorm";

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
        doctors: {
          user: true,
        },
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

  serializeHospital(hospital: Hospital) {
    return {
      id: hospital.id,
      name: hospital.name,
      doctors: hospital.doctors.map((doctor) => ({
        id: doctor.id,
        specialty: doctor.specialty,
        user: {
          firstName: doctor.user.firstName,
          lastName: doctor.user.lastName,
          email: doctor.user.email,
        },
      })),
    };
  }
}
