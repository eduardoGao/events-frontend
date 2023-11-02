import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const LinkRouter = ({
  to,
  children,
}: {
  to: string;
  children: string | React.ReactNode;
}) => {
  return (
    <Link as={RouterLink} to={to}>
      {children}
    </Link>
  );
};
