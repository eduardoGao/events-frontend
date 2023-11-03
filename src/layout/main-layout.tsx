import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Spacer,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useUserStore } from "../hooks/use-user-store";
import { LinkRouter } from "../components/LinkRouter";

export const MainLayout = () => {
  const { user, handleLogout } = useUserStore();

  return (
    <>
      <Flex p="4" bg="green.400">
        <Spacer />

        <Wrap>
          <WrapItem>
            <Center h="100%" bg="green.200">
              <LinkRouter to="my-events">Go to my Events</LinkRouter>
            </Center>
          </WrapItem>
          <WrapItem>
            <Center maxW="100px" h="100%" bg="green.200">
              {user}
            </Center>
          </WrapItem>
          <WrapItem>
            <Button variant="solid" colorScheme="teal" onClick={handleLogout}>
              Logout
            </Button>
          </WrapItem>
        </Wrap>
      </Flex>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
