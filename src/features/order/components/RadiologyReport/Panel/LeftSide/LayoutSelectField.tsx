import { FormControl, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';

import { MySelect } from '@/components';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { selectRadiologyReportIsEditable } from '@/stores/OrderRadiology';
import {
  getOrderLayout,
  getOrderLayouts,
  setOrderLayout,
} from '@/stores/OrderRadiology/orderLayoutSlice';
import { IOrderDTO } from '@/types/dto';

/**
 * Chọn layout duyệt, ký số
 */
export const LayoutSelectField = ({ orderID }: { orderID: IOrderDTO['id'] }) => {
  const dispatch = useAppDispatch();
  const templates = useAppSelector(getOrderLayouts());
  const currentLayout = useAppSelector(getOrderLayout());

  const translate = useTranslate();
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(orderID));

  const onChangeLayout = (event: SelectChangeEvent<number>) => {
    const layout = templates?.find((item) => item.id === event.target.value);
    if (layout) {
      dispatch(setOrderLayout(layout));
    }
  };

  return templates && currentLayout ? (
    <FormControl disabled={!isEditable} fullWidth>
      <InputLabel id="select-layout" size={'small'}>
        {translate.resources.layout.title.long()}
      </InputLabel>
      <MySelect
        fullWidth
        size="small"
        label={translate.resources.layout.title.long()}
        value={currentLayout?.id ?? undefined}
        onChange={onChangeLayout}
      >
        {templates.map((template) => (
          <MenuItem key={template.id} value={template.id}>
            {template.name}
          </MenuItem>
        ))}
      </MySelect>
    </FormControl>
  ) : (
    <></>
  );
};
