// eslint-disable-next-line import/no-unresolved
import { TDocumentDefinitions } from 'pdfmake/interfaces';

export enum TYPE_PDF {
  MODALITY_COUNT = 'MODALITY_COUNT',
  MODALITY_GROUP_COUNT = 'MODALITY_GROUP_COUNT',
  PROCEDURE_COUNT = 'PROCEDURE_COUNT',
  APPROVER_COUNT = 'APPROVER_COUNT',
  DAYOFWEEK_COUNT = 'DAYOFWEEK_COUNT',
}

export const docDefinition1: TDocumentDefinitions = {
  content: [
    'Second paragraph',
    'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
  ],
};
export const docDefinition2: TDocumentDefinitions = {
  content: [
    'Third paragraph',
    'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
  ],
};
