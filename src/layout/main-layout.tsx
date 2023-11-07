import {
  Avatar,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useUserStore } from "../hooks/use-user-store";
import { LinkRouter } from "../components/LinkRouter";
import { MenuCard } from "../components/event-card";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Container maxW="container.lg" mt={4} p={{ base: 4, lg: 0 }}>
        <Outlet />
      </Container>
    </>
  );
};

const Header = () => {
  const { user, handleLogout } = useUserStore();

  const { colorMode, toggleColorMode } = useColorMode();

  const [isLargeScreen] = useMediaQuery("(min-width: 525px)", { ssr: false });

  return (
    <Flex height={16} p="4" justifyContent="space-between" alignItems="center">
      <span>Logo</span>

      <HStack spacing={8}>
        {/* <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button> */}
        {!isLargeScreen ? (
          <Menu>
            <MenuButton
              bgColor="transparent"
              as={IconButton}
              icon={<Avatar size="sm" />}
            />
            <MenuList>
              <MenuItem>{user}</MenuItem>
              <MenuItem>
                <LinkRouter to="my-events">Go to my Events</LinkRouter>
              </MenuItem>

              <MenuGroup>
                <Button
                  variant="ghost"
                  w={"100%"}
                  colorScheme="orange"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </MenuGroup>
            </MenuList>
          </Menu>
        ) : (
          <>
            <LinkRouter to="my-events">Go to my Events</LinkRouter>
            <span>{user}</span>

            <Menu>
              <MenuButton
                bgColor="transparent"
                as={IconButton}
                icon={<Avatar size="sm" />}
              />
              <MenuList p={0}>
                <Button
                  variant="outline"
                  w={"100%"}
                  // color="red.400"
                  borderColor="purple.500"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </MenuList>
            </Menu>
          </>
        )}
      </HStack>
    </Flex>
  );
};
