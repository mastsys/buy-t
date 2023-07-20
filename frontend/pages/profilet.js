/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import {
  Heading,
  Box,
  Button,
  Flex,
  VStack,
  Link,
  Text,
} from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProfilePage = () => {

  const router = useRouter();
  
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState(false)

  const checkConnectedWallet = async () => {
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts[0]) {
        alert ("connecté")
      }
      console.log("Connected", accounts[0]);
      setConnectedAccount(accounts[0]);
      setConnectedWallet(true)
  }
  
  
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Vous devez installer Metamask");
        return;
      }
      else {
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
    
          if (accounts[0]) {
            alert ("connecté")
          }
    
          console.log("Connected", accounts[0]);
          setConnectedAccount(accounts[0]);
      }

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(" ====> ");
    checkConnectedWallet
    //connectWallet();
  }, []);

  return (
    <>
      <Header />
      <Flex>
        <Box w="200px" p={4} boxShadow="base" borderRight="1px solid" borderColor="gray.200">
          <VStack align="start" spacing={4}>
            <Heading as="h3" size="md">Compte</Heading>
            <Text>Nom: </Text>
            <Text>Email: </Text>
            {!connectedWallet && (
  <Button onClick={connectWallet} colorScheme="blue" mt={4}>
    Connecter Wallet
  </Button>
)}
            <Link href="/list">Liste</Link>
            <Button colorScheme="red">
              Déconnexion
            </Button>
          </VStack>
        </Box>
        <Box p={4} flex="1">
          <Heading as="h1" size="xl" mb={4}>
            Hello,!
          </Heading>
          {connectedAccount && <Text>Vous êtes connecté avec l'adresse MetaMask : {connectedAccount}</Text>}
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default ProfilePage;
