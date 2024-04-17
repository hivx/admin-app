import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

type HeadProps = {
  /**
   * ${title} | ${hospitalName} + PACS
   */
  title?: string;
  description?: string;
  srcIcon?: string;
};

/**
 * Add metadata to current document page
 */
export const Head: FC<HeadProps> = (props: HeadProps = {}) => {
  const { title, description, srcIcon } = props;

  return (
    <Helmet title={title}>
      <meta name="description" content={description} />
      (
      <link rel="icon" href={srcIcon} />)
    </Helmet>
  );
};

Head.defaultProps = {
  title: '',
  description: '',
};
