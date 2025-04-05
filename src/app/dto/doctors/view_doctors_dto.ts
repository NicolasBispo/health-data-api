// src/app/dtos/responses/list-paginated-doctors.dto.ts

export class HospitalDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(hospital: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = hospital.id;
    this.name = hospital.name;
    this.createdAt = hospital.createdAt
    this.updatedAt = hospital.updatedAt
  }
}

export class DoctorDto {
  id: string;
  crm: string;
  specialty: string | null;
  hospitals: HospitalDto[];
  createdAt: Date;
  updatedAt: Date;

  constructor(doctor: {
    id: string;
    crm: string;
    specialty: string | null;
    hospitals: any[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = doctor.id;
    this.crm = doctor.crm;
    this.specialty = doctor.specialty;
    this.hospitals = doctor.hospitals.map((h) => new HospitalDto(h));
    this.createdAt = doctor.createdAt
    this.updatedAt = doctor.updatedAt
  }
}

export class ListPaginatedDoctorsDto {
  page: number;
  perPage: number;
  totalCount: number;
  results: DoctorDto[];

  constructor(data: {
    page: number;
    perPage: number;
    totalCount: number;
    results: DoctorDto[];
  }) {
    this.page = data.page;
    this.perPage = data.perPage;
    this.totalCount = data.totalCount;
    this.results = data.results.map((doc) => new DoctorDto({
      ...doc,
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
    }));
  }
}
