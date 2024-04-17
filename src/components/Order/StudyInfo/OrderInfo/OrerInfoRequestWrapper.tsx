import React, { FC, ReactNode, useState } from 'react';

type OrerInfoRequestWrapperProps = {
  renderRequestAutoCompleteField: (
    setCurrentProcedureIds: React.Dispatch<React.SetStateAction<number | undefined>>,
    procedureIds?: number,
  ) => ReactNode;
  initialProcedureIDs?: number;
};
/**
 * Gói trường request auto complete và component request infomation
 */
export const OrerInfoRequestWrapper: FC<OrerInfoRequestWrapperProps> = ({
  renderRequestAutoCompleteField,
  initialProcedureIDs,
}) => {
  const [currentProcedureIds, setCurrentProcedureIds] = useState<number | undefined>(
    initialProcedureIDs,
  );
  return (
    <>{renderRequestAutoCompleteField(setCurrentProcedureIds, currentProcedureIds)}</>
  );
};
