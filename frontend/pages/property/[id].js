import React, { useEffect, useState } from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useRouter } from 'next/router';

const Property = () => {
  const [property, setProperty] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (id) {
          const response = await fetch(`/api/property/getOneProperty/?id=${id}`);
          const data = await response.json();
          if (data.success) {
            setProperty(data.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperty();
  }, [id]);

  return (
    <>
      <Header />

      {property && property._id ? (
        <Box>
          <Heading as="h1" size="xl">
            Informations sur la propriété
          </Heading>
          <Text mt={4}>Superficie : {property.area} m²</Text>
          <Text>Prix au mètre carré : {property.pricePerSquareMeter} €</Text>
          <Text>Ville : {property.city}</Text>
          <Text>Code Postal : {property.postalCode}</Text>
          <Text>CurrentValue : {property.currentValue} €</Text>
          <Text>SCI : {property.SCI}</Text>
        </Box>
      ) : (
        <Box>
          <Text>Chargement en cours...</Text>
        </Box>
      )}

      <Footer />
    </>
  );
};

export default Property;
