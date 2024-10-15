import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Tag as TagIcon,
} from "@mui/icons-material";

const DealerCard = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  // Create a custom theme to override text colors
  const theme = createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'inherit',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: 'inherit',
          },
          secondary: {
            color: 'inherit',
            opacity: 0.7,
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: 'inherit',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Card
        className="dark:bg-darkComponet border border-gray-200 dark:border-gray-600 shadow-2xl dark:shadow-black text-colorText2 dark:text-colorText"
        sx={{ maxWidth: 400, marginY: "auto", mt: 2, borderRadius: 5 }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt="Dealer Avatar"
              src="/avatar-1.jpg"
            />
          }
          title={<Typography variant="h6">Full Name</Typography>}
          subheader={
            <Typography variant="subtitle2" className="opacity-70">
              Business Name
            </Typography>
          }
        />
        <CardContent>
          <Button
            onClick={toggleExpand}
            variant="contained"
            fullWidth
          >
            {expanded ? "Hide Details" : "Show Details"}
          </Button>
          <Collapse in={expanded}>
            <List dense>
              <DetailItem
                icon={<EmailIcon />}
                primary="Business Email"
                secondary="email@example.com"
              />
              <DetailItem
                icon={<PhoneIcon />}
                primary="Business Phone"
                secondary="+1 234 567 8900"
              />
              <DetailItem
                icon={<LocationIcon />}
                primary="Business Address"
                secondary="123 Business St, City, Country"
              />
              <DetailItem
                icon={<BusinessIcon />}
                primary="Business Category"
                secondary="Retail"
              />
              <DetailItem
                icon={<TagIcon />}
                primary="Business GST Number"
                secondary="GST1234567890"
              />
            </List>
          </Collapse>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

const DetailItem = ({ icon, primary, secondary }) => (
  <ListItem>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={primary} secondary={secondary} />
  </ListItem>
);

export default DealerCard;