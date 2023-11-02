import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Event } from "../types";
import { SmallCloseIcon, EditIcon } from "@chakra-ui/icons";
import { useDeleteEventMutation } from "../api";
import { formatDateToYYYYMMDD, formatTimeToHHMM } from "../utils/dates";
import { useAppDispatch } from "../redux/hooks";
import { onOpenDrawer, setSelectedEvent } from "../redux/event-slice";

export const EventCard = ({ title, notes, start, user_id, id }: Event) => {
  const date = formatDateToYYYYMMDD(start);
  const time = formatTimeToHHMM(start);

  const [deleteEvent] = useDeleteEventMutation();

  const dispatch = useAppDispatch();

  const handleEditSelection = (id: string) => {
    dispatch(setSelectedEvent(id));
    dispatch(onOpenDrawer());
  };

  return (
    <Card>
      <CardHeader p={2}>
        <Flex>
          <Heading size="md">{title}</Heading>
          <Spacer />
          <IconButton
            aria-label="Edit Event"
            icon={<EditIcon />}
            onClick={() => handleEditSelection(id)}
          />
          <IconButton
            aria-label="Remove Event"
            icon={<SmallCloseIcon color="red.300" />}
            onClick={() => deleteEvent(id)}
          />
        </Flex>
      </CardHeader>

      <CardBody p={0}>
        <Stack divider={<StackDivider />} spacing="2">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              {notes}
            </Heading>
            <Text pt="1" fontSize="sm">
              {`${date} - ${time}`}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              {user_id.name}
            </Heading>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
