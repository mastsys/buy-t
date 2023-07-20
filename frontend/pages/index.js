import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession, signOut, signIn, signUp } from 'next-auth/react'
import Link from 'next/link';
import { Heading, Box, Text, Button } from '@chakra-ui/react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {

  const { data: session } = useSession()
  return (

    <>
     <Header/>
      <Box minH="100vh" display="flex" color='blue.900' flexDirection="column" alignItems="center" justifyContent="center" p={4}>
        <Heading as="h1" size="xl" mb={4}>
          Bienvenue sur Buy-T
        </Heading>
        <Text textAlign="center" mb={6}>
            Investissez ou accédez à la propriété grâce à la tokenisation de biens immobiliers via Buy-T
        </Text>
        {!session && (
          <Link href="/register">
            <Button colorScheme="blue" variant="solid" size="lg">
              Inscription
            </Button>
          </Link>
        )}
      </Box>
      <Footer/>
    </>
  )
}
