import { useState } from "react";
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import { useLoginMutation } from "../api";
import { useUserStore } from "../hooks/use-user-store";

interface Credentials {
  email: string;
  password: string;
}
export const Login = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "example99@email.com",
    password: "123456",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const [login, { isLoading }] = useLoginMutation();

  const { handleLogin, handleLogout } = useUserStore();

  const submitLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await login({
        email: credentials.email,
        password: credentials.password,
      }).unwrap();

      handleLogin({ token: res.token });
    } catch (error) {
      console.log(error);
      handleLogout();
    }
  };

  return (
    <div>
      <Heading as="h2" paddingBottom={"2rem"}>
        Access to your Account
      </Heading>

      <form onSubmit={submitLogin}>
        <Box mb="1rem">
          <Text mb="8px">Email</Text>
          <Input
            id="email"
            name="email"
            placeholder="example@email.com"
            value={credentials.email}
            onChange={handleInput}
          />
        </Box>
        <Box mb="1rem">
          <Text mb="8px">Password</Text>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInput}
          />
        </Box>
        <Button
          type="submit"
          colorScheme="teal"
          isLoading={isLoading}
          loadingText="Loading"
        >
          Login
        </Button>
      </form>
    </div>
  );
};
