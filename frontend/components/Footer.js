"use client"
import React from 'react';
import { Box, Link, Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="transparent" w="100%" p={4} color="blue.900" borderTop="1px solid" borderColor="blue.200">
      <Flex justifyContent="space-between" alignItems="center">
        <Text>&copy; {new Date().getFullYear()} Buy-T</Text>
      </Flex>
    </Box>
  );
}

export default Footer;