import styled from '@emotion/styled';
import { Row } from '@tanstack/react-table';
import { useMemo, useState, MouseEvent } from 'react';

import { useGetListOrderFileQuery } from '@/api/orderFile';
import {
  StyledDivCenterChildren,
  StyledDivLeftChildren,
} from '@/components/Layout/StyledDiv';
import { IMyDatagridProps } from '@/components/Table/MyDatagrid';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useDisclosure, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { TABLE_ATTACHMENT } from '@/stores/table/tableInitialState';
import { IOrderDTO, IOrderFileDTO } from '@/types/dto';
import { getFileSizeMBText } from '@/utils/fileUtils';

import { PreviewFileModal } from '../../../features/order/components/RadiologyReport/Modal/PreviewFileModal';

import { AttachmentTableRightClickMenu } from './AttachmentTableRightClickMenu';
import { renderFileIcon } from './renderFileIcon';

export const AttachmentTable = ({
  onRowClick,
  orderID,
}: Pick<IMyDatagridProps<IOrderFileDTO>, 'onRowClick'> & {
  orderID: IOrderDTO['id'];
}) => {
  const translate = useTranslate();
  const { data, isFetching } = useGetListOrderFileQuery({ orderID });

  const disclosure = useDisclosure();
  const [filePreview, setFilePreview] = useState<IOrderFileDTO>();
  const { open } = useContextMenu(TABLE_ATTACHMENT);

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
            minSize: 40,
            maxSize: 40,
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
            minSize: 300,
            maxSize: 600,
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
            maxSize: 50,
          }),
      },
    ],
    [translate.messages, translate.resources.report.attachment],
  );

  const onRowDoubleClick = (
    e: MouseEvent<HTMLTableRowElement>,
    row: Row<IOrderFileDTO>,
  ) => {
    setFilePreview(row.original);
    disclosure.open();
  };

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
          onRowRightClick: (e, row) => {
            open(e, row.original);
          },
          onRowDoubleClick: onRowDoubleClick,
          selectRowOnRightClick: true,
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
      {filePreview && disclosure.isOpen && (
        <PreviewFileModal disclosure={disclosure} filePreview={filePreview} />
      )}
      <AttachmentTableRightClickMenu menuID={TABLE_ATTACHMENT} orderID={orderID} />
    </>
  );
};

const StyledSpan = styled.span`
  margin-left: 5px;
`;
