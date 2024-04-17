import { rest } from 'msw';

import { HOSPITAL_ID } from '@/config';

import { authenticate, delayedResponse } from '../utils';

type LoginBody = {
  email: string;
  password: string;
};

export const authHandlers = [
  rest.post<LoginBody>(
    `${import.meta.env.VITE_APP_API_URL_PERMIT_ALL}/hospital/${HOSPITAL_ID}/login`,
    (req, res, ctx) => {
      try {
        const credentials = req.body;
        const result = authenticate(credentials);
        return delayedResponse(ctx.json(result));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return delayedResponse(
          ctx.status(400),
          ctx.json({ message: error?.message || 'Server Error' }),
        );
      }
    },
  ),
];
