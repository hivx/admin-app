import { z } from 'zod';

import { TranslationFunctions } from '@/locales/i18n-types';
import { makeZodSchema } from '@/utils/makeZodSchema';

import { IDataOrderListFormFields } from './types';

export const inputValidate = {
  patientName:
    /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềểỄỆẾỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý^@0-9\s]{3,}$/u,
  patientId: /^[A-Za-z\d\-_!@#$%^&*.,/:;]{3,}$/,
  orderId: /^[A-Za-z\d]{3,}$/,
};

export const OrderListCredentialsSchema = (translate: TranslationFunctions) =>
  makeZodSchema<IDataOrderListFormFields>(() =>
    z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      patientName: z
        .string()
        .regex(
          inputValidate.patientName,
          translate.messages.validation.patientNameRequired(),
        )
        .optional(),
      patientId: z
        .string()
        .regex(inputValidate.patientId, translate.messages.validation.patientIdRequired())
        .optional(),
      orderId: z
        .string()
        .regex(inputValidate.orderId, translate.messages.validation.orderIdRequired())
        .optional(),
      readingStatus: z.string().optional(),
      doctorReader: z.string().optional(),
      referringPhysicianName: z.string().optional(),
      requestedDepartmentName: z.string().optional(),
    }),
  );
