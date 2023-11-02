import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SlideFade,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Event } from "../types";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDeleteEventMutation } from "../api";
import { formatDateToYYYYMMDD, formatTimeToHHMM } from "../utils/dates";
import { useAppDispatch } from "../redux/hooks";
import { onOpenDrawer, setSelectedEvent } from "../redux/event-slice";

export const EventCard = ({ title, notes, start, user_id, id }: Event) => {
  const { isOpen: isVisible } = useDisclosure({ isOpen: true });

  const date = formatDateToYYYYMMDD(start);
  const time = formatTimeToHHMM(start);

  const [deleteEvent] = useDeleteEventMutation();

  const dispatch = useAppDispatch();

  const handleEditSelection = (id: string) => {
    dispatch(setSelectedEvent(id));
    dispatch(onOpenDrawer());
  };

  return (
    <SlideFade in={isVisible}>
      <Card mb={"3rem"}>
        <CardBody>
          <Badge
            fontSize="0.8rem"
            color={"teal.600"}
            variant={"outline"}
          >{`${date} - ${time}`}</Badge>

          <Flex>
            <Heading as="h3" size="md" my="1rem">
              {title}
            </Heading>
            <Spacer />
            <MenuCard>
              <MenuItem onClick={() => handleEditSelection(id)}>Edit</MenuItem>
              <MenuItem onClick={() => deleteEvent(id)}>Delete</MenuItem>
            </MenuCard>
          </Flex>
          <Box>
            <Text>{notes}</Text>
          </Box>
          <Flex mt={"2rem"} alignItems="center">
            <Text fontSize="sm">Hosted by {user_id.name}</Text>
            <Spacer />

            <Button colorScheme="teal">Assist</Button>
          </Flex>
        </CardBody>
      </Card>
    </SlideFade>
  );
};

const MenuCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<HamburgerIcon />} />

      <MenuList>{children}</MenuList>
    </Menu>
  );
};
