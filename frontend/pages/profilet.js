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

import { ethers } from "ethers";
import PropertyTokenABI from "../PropertyTokenABI.json";


const contractAddress = "0xecB436F954ed6EFFb3809CC2067390EE84B87fF8";
//const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


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
  
  async function callGetOwnerAddress() {
    try {

      alert(provider);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, PropertyTokenABI, provider);
      const ownerAddress = await contract.getOwnerAddress();
  
      alert(`Adresse du propriétaire : ${ownerAddress}`);
    } catch (error) {
      console.error(error);
    }
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

<button onClick={callGetOwnerAddress}>Obtenir l'adresse du propriétaire</button>;

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
