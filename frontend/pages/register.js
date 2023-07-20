/* eslint-disable react/no-unescaped-entities */
import React, { useRef } from 'react'
import { useRouter } from 'next/router';
import { Heading, Box, FormControl, FormLabel, Input, Select, Button, useToast } from '@chakra-ui/react'
import Header from "../components/Header"
import Footer from "../components/Footer"

async function createUser(userData) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

const RegisterPage = () => {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const dobInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const statusInputRef = useRef();

  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredDOB = dobInputRef.current.value;
    const enteredStatus = statusInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      toast({
        title: "Error",
        description: "Password and Confirm Password do not match",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const result = await createUser({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        birthDate: enteredDOB,
        email: enteredEmail,
        password: enteredPassword,
        status: enteredStatus,
      });
      
      toast({
        title: "Inscription réussie",
        description: "Connectez vous en cliquant sur le bouton de connexion",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Header/>
      <Box p={4} maxW="400px" mx="auto">
        <Heading as="h1" size="xl" mb={4}>
          Inscription
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Nom</FormLabel>
            <Input type="text" placeholder="Entrez votre nom" ref={firstNameInputRef} />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Prénom</FormLabel>
            <Input type="text" placeholder="Entrez votre prénom" ref={lastNameInputRef} />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Date de naissance</FormLabel>
            <Input type="date" ref={dobInputRef} />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Adresse email</FormLabel>
            <Input type="email" placeholder="Entrez votre adresse email" ref={emailInputRef} />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Mot de passe</FormLabel>
            <Input type="password" placeholder="Entrez votre mot de passe" ref={passwordInputRef} />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Confirmation du mot de passe</FormLabel>
            <Input type="password" placeholder="Confirmez votre mot de passe" ref={confirmPasswordInputRef} />
          </FormControl>

          <FormControl mb={4}>
    <FormLabel>Statut</FormLabel>
    <Select ref={statusInputRef}>
        <option value="propertyBuyer">Accédant à la propriété</option>
        <option value="investor">Investisseur</option>
    </Select>
</FormControl>

          <Button type="submit" colorScheme="blue">S'inscrire</Button>
        </form>
      </Box>
    <Footer/>
    </>
  );
}

export default RegisterPage;
