import { securedApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { IGenericResponse } from '@/types';
import { IExtensionDTO, USER_MODULE } from '@/types/dto';
import {
  IModuleExtensionDTO,
  IModuleExtensionDTOSearch,
} from '@/types/dto/moduleExtension';
import { RESOURCES } from '@/types/resources';

type ModuleToExtensions = Record<USER_MODULE, Set<IExtensionDTO>>;

// Define a service using a base URL and expected endpoints
const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListModuleExtension: builder.query<ModuleToExtensions, IModuleExtensionDTOSearch>({
      query: (arg) => ({
        url: `search/${RESOURCES.MODULE_EXTENSION}`,
        data: { moduleIDs: arg.moduleIDs },
        method: 'POST',
        useAsync: true,
        useHospitalID: true,
      }),
      // parse and convert base response to ModuleToExtensions
      transformResponse: (
        response: IGenericResponse<IModuleExtensionDTO[]>,
        meta,
        args,
      ) => {
        const body = transformResponseGeneric(response);
        const moduleToExtensions: ModuleToExtensions = {
          EXAMINATION: new Set(),
          REPORTING: new Set(),
          PUBLICATION: new Set(),
          TELEMEDICINE: new Set(),
          STATISTICS: new Set(),
          ADMINISTRATION: new Set(),
          REGISTRATION: new Set(),
          SUMMARY: new Set(),
          TIMETABLE: new Set(),
          TEMPLATE: new Set(),
          REPORTING_READING: new Set(),
        };
        body.forEach((moduleExtension) => {
          moduleToExtensions[args.module].add({
            ...moduleExtension.extension,
            index: moduleExtension.index,
            activeOnInit: moduleExtension.activeOnInit,
          });
        });
        return moduleToExtensions;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetListModuleExtensionQuery } = api;
export default api;
