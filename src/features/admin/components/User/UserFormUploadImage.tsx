import { Stack, Typography, styled } from '@mui/material';
import { Box } from '@mui/system';
import { FieldPath, UseFormSetValue } from 'react-hook-form';

import { MyButton } from '@/components';
import { useTranslate } from '@/hooks';

import { useUserFormUploadImage } from '../../hooks/useUserFormUploadImage';

import { UserFormFields } from './UserFormFields';

type UserFormUploadImageProps = {
  name: FieldPath<UserFormFields>;
  title: string;
  image: string;
  setValue: UseFormSetValue<UserFormFields>;
};

export const UserFormUploadImage = (props: UserFormUploadImageProps) => {
  const translate = useTranslate();
  const { name, title, image, setValue } = props;

  const {
    inputImageRef,
    onSelectImage,
    handleUpImage,
    handleDeleteImage,
    imageSrcTaken,
  } = useUserFormUploadImage({ name, image, setValue });

  return (
    <>
      <StyledTitle>{title}</StyledTitle>
      <StyledUserFormUploadImageWrapper>
        <Stack paddingX={1}>
          <Stack spacing={1}>
            <StyledActionButton variant="outlined" onClick={onSelectImage}>
              {translate.resources.user.uploadImg()}
            </StyledActionButton>
            <StyledActionButton variant="outlined" onClick={handleDeleteImage}>
              {translate.resources.user.deleteImg()}
            </StyledActionButton>
          </Stack>
        </Stack>
        <Stack paddingX={1} width={'100%'}>
          <StyledImageWrapper>
            <input
              type="file"
              hidden
              accept=".jpeg, .jpg, .png"
              ref={inputImageRef}
              onChange={handleUpImage}
            />
            <img
              width={'100%'}
              height={'100%'}
              alt={`${name}_image`}
              src={imageSrcTaken}
            />
          </StyledImageWrapper>
        </Stack>
      </StyledUserFormUploadImageWrapper>
    </>
  );
};

const StyledTitle = styled(Typography)``;
const StyledActionButton = styled(MyButton)``;
const StyledImageWrapper = styled(Box)`
  min-height: 200px;
  border: 2px solid ${(props) => props.theme.palette.background.paper};
`;

const StyledUserFormUploadImageWrapper = styled(Stack)`
  display: grid;
  grid-template-columns: 2fr minmax(250px, 4fr);
`;
