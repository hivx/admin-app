import styled from '@emotion/styled';
import { useMemo } from 'react';

import { useGetListOrderFileQuery } from '@/api/orderFile';
import {
  StyledDivCenterChildren,
  StyledDivLeftChildren,
} from '@/components/Layout/StyledDiv';
import { renderFileIcon } from '@/components/Order/AttachmentModal/renderFileIcon';
import { IMyDatagridProps } from '@/components/Table/MyDatagrid';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import { TABLE_ATTACHMENT } from '@/stores/table/tableInitialState';
import { IOrderDTO, IOrderFileDTO } from '@/types/dto';
import { getFileSizeMBText } from '@/utils/fileUtils';

/**
 * Danh sách tệp đính kèm
 */
export const MobileAttachmentTable = ({
  onRowClick,
  orderID,
}: Pick<IMyDatagridProps<IOrderFileDTO>, 'onRowClick'> & {
  orderID: IOrderDTO['id'];
}) => {
  const translate = useTranslate();
  const { data, isFetching } = useGetListOrderFileQuery({ orderID });

  const tableColumns = useMemo<ITableField<IOrderFileDTO>[]>(
    () => [
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'stt',
            header: translate.messages.stt(),
            cell: (props) => (
              <StyledDivCenterChildren>{props.row.index + 1}</StyledDivCenterChildren>
            ),
            size: 40,
          }),
      },
      {
        type: 'custom',
        name: 'name',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'fileName',
            header: () => translate.resources.report.attachment.fileName(),
            cell: (c) => (
              <StyledDivLeftChildren>
                {renderFileIcon(c.row.original.contentType || '')}
                <StyledSpan>{c.row.original.originalName}</StyledSpan>
              </StyledDivLeftChildren>
            ),
            size: 200,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'size',
            header: () => translate.resources.report.attachment.fileSize(),
            cell: (c) => (
              <StyledDivCenterChildren>
                {getFileSizeMBText(c.row.original.size)}
              </StyledDivCenterChildren>
            ),
            size: 50,
          }),
      },
    ],
    [translate.messages, translate.resources.report.attachment],
  );

  return (
    <>
      <MyTable
        tableId={TABLE_ATTACHMENT}
        data={data?.list}
        tableColumnsDescription={tableColumns}
        MyDataGridProps={{
          isLoading: isFetching,
          onRowClick: onRowClick,
          hasRowClick: true,
        }}
        paginationControls={{
          totalRecords: data?.meta.totalRecords,
          pageSize: data?.list.length,
        }}
        TanstackTableOptions={{
          enableRowSelection: true,
          enableMultiRowSelection: true,
        }}
        hiddenFooter
      />
    </>
  );
};

const StyledSpan = styled.span`
  margin-left: 5px;
`;
