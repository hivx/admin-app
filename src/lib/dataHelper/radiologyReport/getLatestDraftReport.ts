import { IRadiologyReportDTO } from '@/types/dto';
import { itechDateTimeToDayjs } from '@/utils/dateUtils';
/**
 * Given an array of reports, return the latest draft report
 */
export const getLatestDraftReport = (
  reports: IRadiologyReportDTO[],
): IRadiologyReportDTO | undefined => {
  const draftReports = reports.filter((report) => !report.approvedTime);
  const sortedByDateDescending = draftReports
    .slice()
    .sort((a, b) =>
      a.reportedTime && b.reportedTime
        ? itechDateTimeToDayjs(b.reportedTime)?.diff(
            itechDateTimeToDayjs(a.reportedTime),
          ) || 0
        : 0,
    );
  return sortedByDateDescending[0];
};
