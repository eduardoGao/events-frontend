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
  const { isOpen: isVisible } = useDisclosure({ isOpen: true });

  const date = formatDateToYYYYMMDD(start);
  const time = formatTimeToHHMM(start);

  const [deleteEvent] = useDeleteEventMutation();

  const dispatch = useAppDispatch();

  const handleEditSelection = (id: string) => {
    dispatch(setSelectedEvent(id));
    dispatch(onOpenDrawer());
  };

  const isUserAttending = assistants?.some((item) => item._id === user_id._id);
  const [addAttendance] = useAddAttendanceMutation();
  const handleAttendance = () => {
    addAttendance({ id, assistant: user_id._id });
  };

  const [removeAttendance] = useRemoveAttendanceMutation();
  const handleRemoveAttendance = () => {
    removeAttendance({ id, assistant: user_id._id });
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
            {isPublicVersion && (
              <MenuCard>
                <MenuItem onClick={() => handleEditSelection(id)}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => deleteEvent(id)}>Delete</MenuItem>
              </MenuCard>
            )}
          </Flex>
          <Box>
            <Text>{notes}</Text>
          </Box>
          <Flex mt={"2rem"} alignItems="center">
            <Text fontSize="sm">Hosted by {user_id.name}</Text>
            <Spacer />
            {isUserAttending ? (
              <CheckCircleIcon
                cursor="pointer"
                color="teal"
                onClick={handleRemoveAttendance}
              />
            ) : (
              <Button colorScheme="teal" size="xs" onClick={handleAttendance}>
                Attend
              </Button>
            )}
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
