import React, { useRef } from 'react';
import { 
  Box, 
  Flex, 
  Button, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Image,
  useDisclosure
} from "@chakra-ui/react";
import { useRouter } from 'next/router';

import { useSession, signOut, signIn } from 'next-auth/react';
import { useEffect } from 'react';

const Header = () => {
  const { data: session } = useSession()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  useEffect(() => {
    console.log("Session ===> ", session)
  }, [session]);

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    await signIn('credentials', {
      redirect: '/',
      email: enteredEmail,
      password: enteredPassword,
    });
  }

  return (
    <Box bg="transparent" w="100%" p={4} color="blue.900" borderBottom="1px solid" borderColor="blue.900">
      <Flex justifyContent="space-between" alignItems="center">
        <Box onClick={() => router.push('/')} cursor="pointer" display="flex" alignItems="center">
          <Image src="/home.png" alt="Home" boxSize="24px" mr={2} />
          <Box fontSize="xl" fontWeight="bold">Buy T</Box>
        </Box>
        {/* <Button colorScheme="blue" variant="" onClick={() => router.push('/list')}>Marketplace</Button> */}
        {session ? (
          <Button colorScheme="blue" variant="transparent" onClick={() => router.push('/profile')}>
            <Image src="/user.png" alt="Profil" boxSize="24px" />
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={onOpen} variant="solid">
            Connexion
          </Button>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Connexion</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input ref={emailInputRef} placeholder="Entrez votre email" />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Mot de passe</FormLabel>
                <Input ref={passwordInputRef} placeholder="Entrez votre mot de passe" type="password" />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={submitHandler}>
                Connexion
              </Button>
              <Button onClick={onClose}>Annuler</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
  
}

export default Header;
