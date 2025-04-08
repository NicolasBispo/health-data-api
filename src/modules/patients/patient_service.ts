import { AppDataSource } from "@/config/database";
import { Patient } from "./patient_entity";
import { CreatePatientDto, UpdatePatientDto } from "./dtos";
import {ContactInfoService} from "@modules/contact_infos/contact_info_service";
import { ContactableType, ContactInfo } from "@modules/contact_infos/contact_infos_entity";

export interface SerializedPatient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactData: {
    id: string;
    value: string;
    type: string;
    contactableId: string;
  }[];
}

export class PatientService {
  private readonly patientRepository = AppDataSource.getRepository(Patient);
  private readonly contactInfoService = new ContactInfoService();

  async createPatient(
    createPatientDto: CreatePatientDto
  ): Promise<SerializedPatient> {
    const patient = this.patientRepository.create({
      ...createPatientDto,
    });
    const contactData = await this.contactInfoService.createContactsForEntity(
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
    return this.serializePatient(savedPatient, contactData);
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

  serializePatient(patient: Patient, contactInfoData?: ContactInfo[]) {
    const { id, firstName, lastName, email } = patient;
    return {
      id,
      firstName,
      lastName,
      email,
      hospitals: patient.hospitals.map((hospital) => ({
        id: hospital.id,
        name: hospital.name,
      })),
      contactData: contactInfoData
        ? contactInfoData.map((contactInfo) => ({
            id: contactInfo.id,
            value: contactInfo.value,
            type: contactInfo.type,
            contactableId: contactInfo.contactableId,
          }))
        : [],
    };
  }
}
