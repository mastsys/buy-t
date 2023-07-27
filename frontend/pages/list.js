import React, { useEffect, useState } from 'react';
import { Box, Image, Text, Heading, VStack, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import Header from "../components/Header";
import Footer from "../components/Footer";

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // Fonction pour récupérer les propriétés depuis l'API
        const fetchProperties = async () => {
            try {
                const response = await fetch('/api/property/getAllProperties');
                const data = await response.json();
                if (data.success) {
                    setProperties(data.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProperties();
    }, []);

    return (
        <>
            <Header />
            <VStack spacing={2} mt="10" align="center">
                <Heading as="h1" size="xl">
                    Marketplace
                </Heading>
                {properties.map((property) => (
                    <Flex direction={{ base: 'column', md: 'row' }} key={property._id} p={5} shadow="md" borderWidth="1px" w="100%">
                        <Box boxSize="sm">
                            <Image src="/1.png" alt={property.title} />
                        </Box>
                        <VStack spacing={4} align="start" ml={{ md: '10' }}>
                            <Heading as="h1" size="lg">
                                {property.SCI}
                            </Heading>
                            <Text mt={2}>{property.city}</Text>
                            <Text>{property.postalCode}</Text>
                            <Text>{`Surface : ${property.area} m²`}</Text>
                            <Text>Prix au mètre carré : {property.pricePerSquareMeter} €</Text>
                            <Text>{`Prix total : ${property.initialValue} €`}</Text>

                            {/* <Link href={`/property/${property._id}`}>
                                <Button colorScheme="blue">
                                    Voir plus
                                </Button>
                            </Link> */}
                        </VStack>
                    </Flex>
                ))}
            </VStack>
            <Footer />
        </>
    );
}

export default PropertyList;
