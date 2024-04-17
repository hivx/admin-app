import { faker } from '@faker-js/faker';

import { IDepartmentDTO } from '@/types/dto';
import { uuidv4 } from '@/utils/uuidv4';

export const departmentGenerator = (
  overrides?: Partial<IDepartmentDTO>,
): IDepartmentDTO => ({
  id: parseInt(faker.random.numeric(12)),
  code: faker.random.word(),
  hospitalID: faker.random.numeric(5),
  name: faker.random.words(4),
  description: faker.lorem.sentences(3),
  enabled: true,
  parentID: null,
  uuid: uuidv4(),
  parent: null,
  ...overrides,
});
