import print from 'print-js';
import React from 'react';

import { ItechDownloadIcon, ItechPrintReportIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableActionButtonsShell } from '@/components/Table/TableActionButtonsShell';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useTranslate } from '@/hooks';

const StatisticReportContentActionButtons = ({ url }: { url: string }) => {
  const translate = useTranslate();
  return (
    <TableActionButtonsShell
      ActionsButton={
        <>
          {/**
           * In báo cáo
           * tính năng chưa hoạt động
           */}
          <IconButtonWithToolTip
            title={translate.buttons.printReport()}
            onClick={() => {
              if (url !== null) {
                print(url, 'pdf');
              }
            }}
            disabled={!url}
          >
            <TableSVGIcon
              IconComponent={ItechPrintReportIcon}
              IconComponentProps={{ color: 'disabled' }}
            />
          </IconButtonWithToolTip>
          {/**
           * Tải pdf
           * tính năng chưa hoạt động
           */}
          <IconButtonWithToolTip
            title={translate.buttons.downloadPdf()}
            onClick={() => {}}
            disabled
          >
            <TableSVGIcon
              IconComponent={ItechDownloadIcon}
              IconComponentProps={{ color: 'disabled' }}
            />
          </IconButtonWithToolTip>
        </>
      }
    />
  );
};

export default StatisticReportContentActionButtons;
