import { faker } from '@faker-js/faker';

import { Gender, IPatientDTO, IPatientDTOCreate } from '@/types/dto';
import { formatDate } from '@/utils/dateUtils';

import { ORDER_CREATION_TYPE } from '../../types/dto/order';

export const patientGenerator = (overrides?: IPatientDTO): IPatientDTO => ({
  id: parseInt(faker.random.numeric(12)),
  address: `${faker.address.streetAddress()}, ${faker.address.city()}`,
  birthDate: formatDate(faker.date.birthdate()),
  creationType: faker.helpers.arrayElement<`${ORDER_CREATION_TYPE}`>(
    Object.values(ORDER_CREATION_TYPE),
  ),
  email: faker.internet.email(),
  fullname: faker.name.fullName(),
  gender: faker.helpers.arrayElement<`${Gender}`>(Object.values(Gender)),
  hospitalID: faker.random.numeric(5),
  phone: faker.phone.number('0#########'),
  pid: faker.random.alphaNumeric(10),
  portalCode: faker.random.alphaNumeric(5),
  ...overrides,
});

export const patientCreateGenerator = (
  overrides?: Partial<IPatientDTOCreate>,
): IPatientDTOCreate => ({
  address: `${faker.address.streetAddress()}, ${faker.address.city()}`,
  birthDate: formatDate(faker.date.birthdate()),
  creationType: faker.helpers.arrayElement<`${ORDER_CREATION_TYPE}`>(
    Object.values(ORDER_CREATION_TYPE),
  ),
  email: faker.internet.email(),
  fullname: faker.name.fullName(),
  gender: faker.helpers.arrayElement<`${Gender}`>(Object.values(Gender)),
  phone: faker.phone.number('0#########'),
  pid: faker.random.alphaNumeric(10),
  ...overrides,
});
