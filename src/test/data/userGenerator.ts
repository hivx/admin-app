import { faker } from '@faker-js/faker';

import { ICloudUserDTO, USER_TYPE } from '@/types/dto';

import { uuidv4 } from './../../utils/uuidv4';

export const cloudUserGenerator = (overrides?: ICloudUserDTO): ICloudUserDTO => ({
  id: parseInt(faker.random.numeric(12)),
  code: faker.random.word(),
  fullname: faker.name.fullName(),
  hospitalID: faker.random.numeric(5),
  title: faker.random.word(),
  username: faker.internet.userName(),
  level: parseInt(faker.random.numeric(1)),
  roles: [],
  type: faker.helpers.arrayElement(Object.values(USER_TYPE)),
  uuid: uuidv4(),
  ...overrides,
});
