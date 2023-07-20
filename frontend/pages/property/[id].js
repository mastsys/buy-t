import React, { useEffect, useState } from 'react';
import { Box, Image, Text, Heading, VStack, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Property = () => {
    const [property, setProperty] = useState([]);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
      const fetchProperty = async () => {
        try {
          const response = await fetch(`/api/property/getOneProperty/${id}`);
          const data = await response.json();
          if (data.success) {
            setProperty(data.data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      console.log(property)
    
      fetchProperty();
    }, [id, property]);
    

    return (
        <>
            <Header />

            <Footer />
        </>
    );
}

export default Property;
