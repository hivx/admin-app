import { Grid } from '@mui/material';

import * as Icons from '@/assets/icon';

export default {
  title: 'Icons/AllIcon',
};

export const ListAllIcon = () => {
  const icons = Object.values(Icons);
  return (
    <Grid container spacing={4}>
      {icons.map((IconComponent) => (
        <Grid key={IconComponent.displayName} item xs={2}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconComponent style={{ width: 35, height: 35, margin: 10 }} />
            <span>{IconComponent.displayName}</span>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};
