import { useState } from "react";
import { Link } from "react-router-dom";
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Menu,
  Text,
  Button,
  Popover,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineProvider } from "@mantine/core";
import { buddyTheme } from "./Theme";
import { Home } from "tabler-icons-react";

import WeatherModal from "../components/WeatherModal";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.colors.moss,
    }).background,
    borderBottom: 0,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  icons: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

// interface HeaderMiddleProps {
//   links: { link: string, label: string }[];
// }

export function HeaderMiddle(props) {
  const links = [
    { link: "www.example.com", label: "example" },
    { link: "www.youtube.com", label: "youtube" },
  ];

  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <MantineProvider theme={buddyTheme}>
      <Header height={56} mb={120} className={classes.header}>
        <Container className={classes.inner}>
          <Menu
            shadow="md"
            width={200}
            position="bottom-start"
            offset={2}
            withArrow
          >
            <Menu.Target>
              <ActionIcon variant="transparent" size="lg">
                <Home strokeWidth={1} color={"#fff"} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label></Menu.Label>
              <Menu.Item component={Link} to="/">
                Plant Garden
              </Menu.Item>
              <Menu.Item component={Link} to="/community">
                Community
              </Menu.Item>
              <Menu.Item component={Link} to="/forums">
                Forum
              </Menu.Item>
              <Menu.Item component={Link} to="/recommendations">
                Recommendations
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" onClick={props.handleLogout}>
                Log Out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Group className={classes.links} spacing={5}>
            {items}
          </Group>

          <Group spacing={0} className={classes.icons} position="right" noWrap>
            <Popover width={340} position="bottom-end" withArrow shadow="md">
              <Popover.Target>
                <Button>Weather Now</Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Text size="sm">
                  <WeatherModal />
                </Text>
              </Popover.Dropdown>
            </Popover>
            {/* <Menu
              shadow="md"
              width={200}
              position="bottom-end"
              offset={2}
              withArrow
            >
              <Menu.Target>
                <Button> Weather Now: </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Weather Forecast</Menu.Label>
                <Menu.Label>
                  <WeatherModal />
                </Menu.Label>
              </Menu.Dropdown>
            </Menu> */}
          </Group>
        </Container>
      </Header>
    </MantineProvider>
  );
}