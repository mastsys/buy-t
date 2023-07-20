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
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();
  
  const [connectedAccount, setConnectedAccount] = useState(null);

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

      console.log("Connected", accounts[0]);
      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = () => {
    signOut({ redirect: '/' });
  };

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/');
    } else {
      console.log("user ====> ", session)
    };
    connectWallet();
  }, [loading, session, router]);

  if (loading || !session) {
    return null;
  }

  return (
    <>
      <Header />
      <Flex>
        <Box w="200px" p={4} boxShadow="base" borderRight="1px solid" borderColor="gray.200">
          <VStack align="start" spacing={4}>
            <Heading as="h3" size="md">Compte</Heading>
            <Text>Nom: {session.user.lastName}</Text>
            <Text>Email: {session.user.email}</Text>
            <Button onClick={connectWallet} colorScheme="blue" mt={4}>
              Connecter Wallet
            </Button>
            <Link href="/list">Liste</Link>
            <Button onClick={handleSignOut} colorScheme="red">
              Déconnexion
            </Button>
          </VStack>
        </Box>
        <Box p={4} flex="1">
          <Heading as="h1" size="xl" mb={4}>
            Bonjour, {session?.user?.firstName}!
          </Heading>
          {connectedAccount && <Text>Connecté avec l'adresse MetaMask : {connectedAccount}</Text>}
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default ProfilePage;
