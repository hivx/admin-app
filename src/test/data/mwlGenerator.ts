import { faker } from '@faker-js/faker';

import { Gender, IPatientDTO } from '@/types/dto';
import { formatDate } from '@/utils/dateUtils';

import { ORDER_CREATION_TYPE } from '../../types/dto/order';

import { IMwlBase } from './../../features/qms/types/mwl';

export const mwlGenerator = (overrides?: Partial<IMwlBase>): IMwlBase => ({
  address: `${faker.address.streetAddress()}, ${faker.address.city()}`,
  birthDate: formatDate(faker.date.birthdate()),
  patientName: faker.name.fullName(),
  gender: faker.helpers.arrayElement<`${Gender}`>(Object.values(Gender)),
  ticketNumber: faker.helpers.unique(() => faker.random.numeric(5)),
  pid: faker.random.alphaNumeric(10),
  modalityID: parseInt(faker.random.numeric()),
  orderID: parseInt(faker.random.numeric(10)),
  procedureCode: faker.random.numeric(10),
  procedureID: parseInt(faker.random.numeric(10)),
  serviceID: parseInt(faker.random.numeric(10)),
  ticketID: parseInt(faker.random.numeric(10)),
  accessionNumber: faker.random.numeric(10),
  procedureName: faker.lorem.sentence(5),
  roomName: faker.lorem.sentence(5),
  ...overrides,
});
