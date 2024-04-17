import { z } from 'zod';

import { TranslationFunctions } from '@/locales/i18n-types';
import { makeZodSchema } from '@/utils/makeZodSchema';

import { LoginCredentialsDTO } from './types/index';

export const MIN_USERNAME_LENGTH = 1;
export const MIN_PASSWORD_LENGTH = 6;

export const LoginCredentialsSchema = (translate: TranslationFunctions) =>
  makeZodSchema<LoginCredentialsDTO>(() =>
    z.object({
      username: z.string().min(
        MIN_USERNAME_LENGTH,
        translate.messages.validation.genericMinLength({
          resource: translate.resources.user.username(),
          length: MIN_USERNAME_LENGTH,
        }),
      ),
      password: z.string().min(
        MIN_PASSWORD_LENGTH,
        translate.messages.validation.genericMinLength({
          resource: translate.resources.user.password(),
          length: MIN_PASSWORD_LENGTH,
        }),
      ),
    }),
  );
