import React from 'react';

import { Box, Image } from '@chakra-ui/react';

export default function Icon({ size, src, alt, ...props }) {
  return (
    <Box boxSize={size ? size : 'small'} cursor="pointer" {...props}>
      <Image src={src} alt={alt} />
    </Box>
  );
}
