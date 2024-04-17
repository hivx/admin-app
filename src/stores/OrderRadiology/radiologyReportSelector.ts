import { RootState } from '@/stores/redux';

import { IOrderReportKey } from './radiologyReportSlice';

// For simple reducer, we can include getters here
// New naming convention: https://redux.js.org/style-guide/#name-selector-functions-as-selectthing
export const selectOrderReportState =
  (orderID: IOrderReportKey['orderID']) => (state: RootState) =>
    state.radiologyReportContext[orderID]
      ? state.radiologyReportContext[orderID]
      : undefined;

export const selectRadiologyReportState =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID]?.reports[options.requestID];

export const selectRadiologyReportSubmission =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID]?.reports[options.requestID]?.data;

export const selectContentTemplateID = (options: IOrderReportKey) => (state: RootState) =>
  state.radiologyReportContext[options.orderID]?.reports[options.requestID]?.context
    .contentTemplateID;

export const selectCurrentRequestID =
  (orderID: IOrderReportKey['orderID']) => (state: RootState) =>
    state.radiologyReportContext[orderID]?.currentRequestID;

export const selectRadiologyReportFindings =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID]?.reports[options.requestID]?.data
      .findings;

export const selectRadiologyReportImpression =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID]?.reports[options.requestID]?.data
      .impression;

export const selectRadiologyReportComments =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID]?.reports[options.requestID]?.data
      .comments;
export const selectRadiologyReportDescription =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID]?.reports[options.requestID]?.data
      .description;

export const selectRadiologyReportMetadata =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID]?.reports[options.requestID]?.data;

export const selectRadiologyReportOperatorIDs =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID]?.reports[options.requestID]?.data
      .operatorIDs;

export const selectCurrentRadiologyReportID =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID]?.reports[options.requestID]?.data.id;

export const selectApprovedModalityID =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID]?.reports[options.requestID]?.data
      .approvedModalityID;

export const selectCurrentActiveReportID =
  (orderID: IOrderReportKey['orderID']) => (state: RootState) =>
    state.radiologyReportContext[orderID]?.activeReportID;

export const selectErrorRadiologyDateTime =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID].errorRadiologyDateTime[
      options.requestID
    ];

export const selectRadiologyReportImages =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID].reports[options.requestID]?.data.images;

export const selectRadiologyReportConsumables =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID].reports[options.requestID]?.data
      .consumables;

export const selectRadiologyReportReporterID =
  (options: IOrderReportKey) => (state: RootState) =>
    state.radiologyReportContext[options.orderID].reports[options.requestID]?.data
      .reporterID;

export const selectApproveTime = (options: IOrderReportKey) => (state: RootState) =>
  state.radiologyReportContext[options.orderID]?.reports[options.requestID]?.data
    .approvedTime;
