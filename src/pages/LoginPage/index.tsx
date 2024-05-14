import { Flex, Heading, Stack, Box, Link, Avatar } from "@chakra-ui/react";
import LoginForm from "../../components/LoginForm";

const LoginPage = () => {
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDirection="column"
        marginBottom="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar background="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minWidth={{ base: "90%", md: "468px" }}>
          <LoginForm />
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default LoginPage;
