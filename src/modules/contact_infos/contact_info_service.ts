import { AppDataSource } from "@/config/database";
import { ContactableType, ContactInfo } from "./contact_infos_entity";

export class ContactInfoService {
  private readonly contactRepository = AppDataSource.getRepository(ContactInfo);

  async createContactInfo(contactInfo: ContactInfo): Promise<ContactInfo> {
    const contact = this.contactRepository.create(contactInfo);
    const savedContact = await this.contactRepository.save(contact);
    return savedContact;
  }

  async createContactsForEntity(
    Entity: ContactableType,
    entityId: string,
    contacts: Omit<ContactInfo, "id" | "createdAt" | "updatedAt">[]
  ): Promise<ContactInfo[]> {
    const contactEntities = contacts.map((contact) => {
      const contactItem = new ContactInfo();
      contactItem.value = contact.value;
      contactItem.type = contact.type;
      contactItem.contactableType = Entity;
      contactItem.contactableId = entityId;
      return contactItem;
    });
    const savedContacts = await this.contactRepository.save(contactEntities);
    return savedContacts;
  }
}
