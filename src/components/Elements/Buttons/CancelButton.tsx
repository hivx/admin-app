import { IMyButtonProps, MyButton } from './MyButton';

function CancelButton(props: IMyButtonProps) {
  return <MyButton variant="outlined" color="inherit" {...props} />;
}

export default CancelButton;
