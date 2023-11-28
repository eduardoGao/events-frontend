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
import { CheckCircleIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  useAddAttendanceMutation,
  useDeleteEventMutation,
  useRemoveAttendanceMutation,
} from "../api";
import { formatDateToYYYYMMDD, formatTimeToHHMM } from "../utils/dates";
import { useAppDispatch } from "../redux/hooks";
import { onOpenDrawer, setSelectedEvent } from "../redux/event-slice";
import { useUserStore } from "../hooks/use-user-store";

type EventCard = Event & {
  isPublicVersion: boolean;
};

export const EventCard = ({
  title,
  notes,
  start,
  user_id,
  id,
  assistants,
  isPublicVersion = true,
}: EventCard) => {
  const { uid } = useUserStore();
  const { isOpen: isVisible } = useDisclosure({ isOpen: true });

  const date = formatDateToYYYYMMDD(start);
  const time = formatTimeToHHMM(start);

  const [deleteEvent] = useDeleteEventMutation();

  const dispatch = useAppDispatch();

  const handleEditSelection = (id: string) => {
    dispatch(setSelectedEvent(id));
    dispatch(onOpenDrawer());
  };

  const isUserAttending = assistants?.some((item) => item._id === uid);
  const [addAttendance] = useAddAttendanceMutation();
  const handleAttendance = () => {
    addAttendance({ id, assistant: uid! });
  };

  const [removeAttendance] = useRemoveAttendanceMutation();
  const handleRemoveAttendance = () => {
    removeAttendance({ id, assistant: uid! });
  };

  return (
    <SlideFade in={isVisible}>
      <Card boxShadow="outline" bg="gray.800" color="gray.50">
        <CardBody>
          <Badge
            fontSize="0.8rem"
            colorScheme="purple"
          >{`${date} | ${time}`}</Badge>

          <Flex>
            <Heading as="h3" size="md" my="1rem">
              {title}
            </Heading>
            <Spacer />
            {isPublicVersion && (
              <MenuCard>
                <MenuItem bg="inherit" onClick={() => handleEditSelection(id)}>
                  Edit
                </MenuItem>
                <MenuItem bg="inherit" onClick={() => deleteEvent(id)}>
                  Delete
                </MenuItem>
              </MenuCard>
            )}
          </Flex>
          <Box>
            <Text>{notes}</Text>
          </Box>
          {!isPublicVersion ? (
            <Flex mt={"2rem"} alignItems="center">
              <Text fontSize="sm">Hosted by {user_id.name}</Text>
              <Spacer />

              {isUserAttending ? (
                <CheckCircleIcon
                  cursor="pointer"
                  color="purple.500"
                  onClick={handleRemoveAttendance}
                />
              ) : (
                <Button size="xs" onClick={handleAttendance}>
                  Attend
                </Button>
              )}
            </Flex>
          ) : (
            <Box>
              <Text>Assistants:</Text>
              {assistants.map((item) => (
                <Text key={item._id}>{item.name}</Text>
              ))}
            </Box>
          )}
        </CardBody>
      </Card>
    </SlideFade>
  );
};

export const MenuCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<HamburgerIcon />}
        bg={"none"}
        _hover={{ bg: "gray.700" }}
      />

      <MenuList bg="gray.700">{children}</MenuList>
    </Menu>
  );
};
