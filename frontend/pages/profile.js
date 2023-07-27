import React, { useState, useEffect } from 'react';
import {
  Heading,
  Box,
  Button,
  Flex,
  VStack,
  Link,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import { ethers } from "ethers";
import PropertyTokenABI from "../PropertyTokenABI.json";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();
  const [properties, setProperties] = useState([]);

  const [connectedAccount, setConnectedAccount] = useState(null);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

  const approveProperty = async (property) => {

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, PropertyTokenABI, signer);
      const approvedProperty = await contract.addProperty(property.SCI, property.currentValue);
     // const updateProperty = await fetch(`http://localhost:3000/api/property/${propertyId}`)

     const data = {
      id: property._id,
      approvedForTransaction: true
    };
  
      const updateProperty = await fetch(`http://localhost:3000/api/property/updateProperty`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });

    } catch (error) {
      console.error(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = () => {
    signOut({ redirect: '/' });
  };

  useEffect(() => {

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
    const { ethereum } = window;

    if (!loading && !session) {
      router.replace('/');
    }

    fetchProperties();
    connectWallet();
  }, [loading, session, router]);

  if (loading || !session) {
    return null;
  }

  return (
    <>
      <Header />
      <Flex>
        <Box w="200px" h="500px" p={4} boxShadow="base" borderRight="1px solid" borderColor="gray.200">
          <VStack align="start" spacing={4}>
            <Heading as="h3" size="md">Compte</Heading>
            <Text>Email: {session.user.email}</Text>
            {/* {connectedAccount === null && (
              <Button onClick={connectWallet} colorScheme="blue" mt={4}>
                Connecter Wallet
              </Button>
            )} */}
            <Button onClick={handleSignOut} colorScheme="red">
              Déconnexion
            </Button>
          </VStack>
        </Box>
        <Box p={4} flex="1">
        <Heading as="h1" size="xl" mb={4}>
          {session?.user?.firstName}
        </Heading>
        <Text>{connectedAccount}</Text>
    <>
      <Heading as="h2" size="lg" mt={5} mb={4}>
        Liste des biens
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>SCI</Th>
            <Th>Ville</Th>
            <Th>Valeur initiale</Th>
            {session.user.role === "admin" && <Th>Action</Th>}
          </Tr>
          </Thead>
        <Tbody>
        { properties.map((property) => (
          <Tr key={property.id}>
            <Td>{property._id}</Td>
            <Td>{property.SCI}</Td>
            <Td>{property.city}</Td>
            <Td>{property.currentValue} €</Td>
            {session.user.role === "admin" && !property.approvedForTransaction && (
              <Td>
                <Button colorScheme="green" onClick={() => approveProperty(property)}>Valider</Button>
              </Td>
            )}
          </Tr>
        )) }
        </Tbody>
      </Table>
    </>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default ProfilePage;
