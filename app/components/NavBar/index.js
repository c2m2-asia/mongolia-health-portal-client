import React, { useState } from 'react';
import { uid } from 'react-uid';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import Popover from '@material-ui/core/Popover';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Steps } from 'intro.js-react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import 'intro.js/introjs.css';

export const sidebarMenuItems = [
  {
    category: 'Hospitals',
    children: [
      {
        type: 'public_hospitals',
        route: '/public_hospitals',
        label: 'Public Hospitals',
      },
      {
        type: 'private_hospitals',
        route: '/private_hospitals',
        label: 'Private Hospitals',
      },
    ],
  },
  {
    category: 'Clinics',
    children: [
      {
        type: 'public_clinics',
        route: '/public_clinics', // Combines secondary HCS, tertiary HCS, and AYUSH center
        label: 'Public Clinics and Government Centers',
      },
      {
        type: 'private_clinics',
        route: '/private_clinics',
        label: 'Private Clinics',
      },
      {
        type: 'dentists',
        route: '/dentists',
        label: 'Dentists',
      },
      {
        type: 'veterinaries',
        route: '/veterinaries',
        label: 'Veterinaries',
      },
    ],
  },
  {
    category: 'Others',
    children: [
      {
        type: 'patho_radio_labs',
        route: '/patho_radio_labs',
        label: 'Pathology and Radiology Labs',
      },
      {
        type: 'anganwadi',
        route: '/anganwadi',
        label: 'Anganwadis',
      },
      {
        type: 'blood_banks',
        route: '/blood_banks',
        label: 'Blood Banks',
      },
      {
        type: 'mental_health_centers',
        route: '/mental_health_centers',
        label: 'Mental Health Centers',
      },
      {
        type: 'bus_stops',
        route: '/bus_stops',
        label: 'Bus Stops',
      },
    ],
  },
];

const steps = [
  {
    element: '.selector1',
    intro: <FormattedMessage {...messages.introFilter} />,
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.selector2',
    intro: <FormattedMessage {...messages.introAmenity} />,
  },
  {
    element: '.selector3',
    intro: <FormattedMessage {...messages.introLocation} />,
  },
  {
    element: '.selector4',
    intro: <FormattedMessage {...messages.introOtherFilters} />,
  },
  {
    element: '.selector5',
    intro: <FormattedMessage {...messages.introShow} />,
  },
  {
    element: '.selector6',
    intro: <FormattedMessage {...messages.introMap} />,
  },
  {
    element: '.selector7',
    intro: <FormattedMessage {...messages.introSearch} />,
  },
  {
    element: '.selector8',
    intro: <FormattedMessage {...messages.introDownload} />,
  },
];

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function SwipeableTemporaryDrawer({
  history,
  onLocaleToggle,
  locale,
}) {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState('');
  const [isTourEnabled, setIsTourEnabled] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLanguageClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    // setState({ ...state, [anchor]: open });
  };

  const handleClick = index => {
    if (selectedIndex === index) {
      setSelectedIndex('');
    } else {
      setSelectedIndex(index);
    }
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Select a category
          </ListSubheader>
        }
        className={classes.root}
      >
        {sidebarMenuItems.map((menuItem, index) => (
          <React.Fragment key={uid(menuItem)}>
            <ListItem button onClick={() => handleClick(index)}>
              <ListItemText primary={menuItem.category} />
              {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menuItem.children.map(subCategory => (
                  <ListItem
                    key={uid(subCategory)}
                    component={Link}
                    to={subCategory.route}
                    button
                    className={classes.nested}
                  >
                    <ListItemText primary={subCategory.label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar
        position="static"
        color="white"
        elevation={0}
        style={{ borderBottom: '1px solid rgba(105,105,105,0.33)' }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <FormattedMessage {...messages.projectTitle} />
          </Typography>

          <div style={{display: 'flex', flexDirection: 'row', gap: '0.8rem'}}><Button
            color="secondary"
            startIcon={<TranslateIcon />}
            endIcon={<ExpandMoreIcon />}
            onClick={handleLanguageClick}
          >
            {locale === 'mn' ? 'монгол' : 'English'}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleLanguageClose}
          >
            <MenuItem
              onClick={e => onLocaleToggle('en')}
              data-my-value="English"
            >
              English
            </MenuItem>
            <MenuItem
              onClick={e => onLocaleToggle('mn')}
              data-my-value="Mongolia"
            >
              монгол
            </MenuItem>
          </Menu>
          <Button color="secondary" onClick={() => setIsTourEnabled(true)}>
            How to use
          </Button>
          <Steps
            enabled={isTourEnabled}
            steps={steps}
            initialStep={0}
            onExit={() => setIsTourEnabled(false)}
            options={{
              nextLabel: 'Next',
              prevLabel: 'Prev',
              skipLabel: 'Skip',
              doneLabel: 'Done',
              scrollToElement: false,
              showStepNumbers: false,
            }}
          />
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <Button color="secondary">about</Button>
          </NavLink>
          </div>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
      >
        {list('left')}
      </SwipeableDrawer>
    </div>
  );
}
