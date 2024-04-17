import { faker } from '@faker-js/faker';
import React from 'react';

import { useGetListDepartmentsQuery } from '@/api/departments';
import { MyButton } from '@/components';
import { orderCreateGenerator } from '@/test/data/orderGenerator';

import { useCreateOneOrderMutation } from '../../../api/order';
import { useGetListPatientsQuery } from '../api/patient';

export const TestCreateOrderList = (props: { numOrder?: number }) => {
  const { numOrder = 1 } = props;
  const [trigger] = useCreateOneOrderMutation();
  const { data: patientData } = useGetListPatientsQuery({ filter: {} });

  const { data: departmentData } = useGetListDepartmentsQuery({ filter: {} });

  const patientIDs = patientData?.list.map((patient) => patient.id);
  const departmentIDs = departmentData?.list.map((department) => department.id);

  const createOrders = () => {
    if (patientIDs) {
      for (let i = 0; i < numOrder; ++i) {
        trigger(
          orderCreateGenerator({
            patientID: faker.helpers.arrayElement<number>(patientIDs),
            requestedDepartmentID: faker.helpers.arrayElement<number>(departmentIDs),
          }),
        );
      }
    }
  };
  return <MyButton onClick={createOrders}>Submit test orders</MyButton>;
};
