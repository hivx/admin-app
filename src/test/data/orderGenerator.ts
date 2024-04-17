import { faker } from '@faker-js/faker';
import { parseInt } from 'lodash';

import { IOrderDTO, ORDER_DIAGNOSIS_STEP_STATUS } from '@/types/dto';
import { formatDate, formatDateTime } from '@/utils/dateUtils';
import { uuidv4 } from '@/utils/uuidv4';

import { IOrderCreateDTO, ORDER_CREATION_TYPE } from '../../types/dto/order';

import { IOrderRequestDTO } from './../../types/dto/orderRequest';
import { departmentGenerator } from './departmentGenerator';
import { orderRequestGenerator } from './orderRequestGenerator';
import { patientGenerator } from './patientGenerator';
import { cloudUserGenerator } from './userGenerator';

export const orderGenerator = (overrides?: IOrderDTO): IOrderDTO => {
  const orderID = parseInt(faker.random.numeric(12));
  const randomRequestNum = Math.floor(Math.random() * 10);
  const orderRequests: IOrderRequestDTO[] = [];
  const hospitalID = faker.random.numeric(5);
  for (let i = 0; i < randomRequestNum; ++i)
    orderRequests.push(orderRequestGenerator({ orderID }));
  return {
    inpatient: null,
    id: orderID,
    accessionNumber: faker.random.numeric(12),
    attributes: {},
    creationType: faker.helpers.arrayElement<`${ORDER_CREATION_TYPE}`>(
      Object.values(ORDER_CREATION_TYPE),
    ),
    description: faker.lorem.words(20),
    diagnosis: faker.lorem.words(20),
    encounterNumber: faker.random.alphaNumeric(10),
    hospitalID: hospitalID,
    instructions: faker.lorem.words(20),
    insuranceApplied: true,
    insuranceExpiredDate: formatDate(faker.date.future(2)),
    insuranceIssuedDate: formatDate(faker.date.past(2)),
    insuranceNumber: faker.random.numeric(10),
    lockedBy: Math.random() > 0.5 ? cloudUserGenerator() : null,
    modalityType: faker.helpers.arrayElement<'CT' | 'MR' | 'MG'>(['CT', 'MR', 'MG']),
    patient: patientGenerator(),
    priority: {
      id: 1,
      hospitalID,
      name: 'mock priority',
      preferred: Math.random() > 0.5 ? true : false,
      uuid: uuidv4(),
    },
    referringPhysician: Math.random() > 0.5 ? cloudUserGenerator() : null,
    reportStatus: faker.helpers.arrayElement<`${ORDER_DIAGNOSIS_STEP_STATUS}`>(
      Object.values(ORDER_DIAGNOSIS_STEP_STATUS),
    ),
    requestedDepartment: departmentGenerator(),
    requestedTime: formatDateTime(faker.date.recent(10)),
    requests: orderRequests,
    study: null,
    urgent: faker.helpers.arrayElement<boolean>([true, false]),
    uuid: uuidv4(),
    voided: false,
    orderNumber: '123',
    ...overrides,
  };
};

export const orderCreateGenerator = (
  overrides?: Partial<IOrderCreateDTO>,
): IOrderCreateDTO => {
  return {
    accessionNumber: faker.random.numeric(12),
    attributes: {},
    creationType: ORDER_CREATION_TYPE.HIS,
    diagnosis: faker.lorem.words(20),
    encounterNumber: faker.random.alphaNumeric(10),
    instructions: faker.lorem.words(20),
    insuranceApplied: true,
    insuranceExpiredDate: formatDate(faker.date.future(2)),
    insuranceIssuedDate: formatDate(faker.date.past(2)),
    insuranceNumber: faker.random.numeric(10),
    patientID: 1,
    priorityID: 1,
    requests: [],
    modalityType: faker.helpers.arrayElement<'CT' | 'MR' | 'MG'>(['CT', 'MR', 'MG']),
    referringPhysicianID: undefined,
    reportStatus: faker.helpers.arrayElement<`${ORDER_DIAGNOSIS_STEP_STATUS}`>(
      Object.values(ORDER_DIAGNOSIS_STEP_STATUS),
    ),
    orderNumber: faker.random.numeric(12),
    description: faker.lorem.words(20),
    requestedDepartmentID: faker.helpers.arrayElement<number>([1, 2, 3, 4, 5]),
    requestedTime: formatDateTime(faker.date.recent(10)),
    urgent: faker.helpers.arrayElement<boolean>([true, false]),
    ...overrides,
  };
};
