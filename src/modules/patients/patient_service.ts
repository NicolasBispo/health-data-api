import { AppDataSource } from "@/config/database";
import { Patient } from "./patient_entity";
import { CreatePatientDto, UpdatePatientDto } from "./dtos";
import { ContactInfoService } from "@modules/contact_infos/contact_info_service";
import { ContactableType } from "@modules/contact_infos/contact_infos_entity";

export class PatientService {
  private readonly patientRepository = AppDataSource.getRepository(Patient);
  private readonly contactInfoService = new ContactInfoService();

  async createPatient(createPatientDto: CreatePatientDto) {
    const patient = this.patientRepository.create({
      ...createPatientDto,
    });
    await this.contactInfoService.createContactsForEntity(
      ContactableType.PATIENT,
      patient.id,
      (createPatientDto?.contacts ?? []).map((contact) => ({
        value: contact.value,
        type: contact.type,
        contactableType: ContactableType.PATIENT,
        contactableId: patient.id,
      }))
    );
    const savedPatient = await this.patientRepository.save(patient);
    return savedPatient;
  }

  async listAllPatients(args: {
    perPage: number;
    skip: number;
  }): Promise<Patient[]> {
    const patients = await this.patientRepository.find({
      take: args.perPage,
      skip: args.skip,
      relations: {
        hospitals: true,
      },
    });
    return patients;
  }

  async findOnePatient(id: string): Promise<Patient | null> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: {
        hospitals: true,
      },
    });
    return patient;
  }

  async updatePatient(id: string, updatePatientDto: UpdatePatientDto) {
    await this.patientRepository.update(
      {
        id,
      },
      {
        ...updatePatientDto,
      }
    );
    return await this.patientRepository.findOneBy({ id });
  }

  async destroyPatient(id: string) {
    const patient = await this.patientRepository.findOneBy({ id });
    if (!patient) {
      return null;
    }
    await this.patientRepository.delete({ id });
    return patient;
  }

  async count() {
    const count = await this.patientRepository.count();
    return count;
  }
}
