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

export const MainLayout = () => {
  const { user, handleLogout } = useUserStore();

  return (
    <>
      <Flex p="4" bg="green.400">
        <Spacer />
        <Box>
          <Wrap>
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
        </Box>
      </Flex>
      {/* <Container> */}
      <Outlet />
      {/* </Container> */}
    </>
  );
};
