import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Steps } from 'intro.js-react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import 'intro.js/introjs.css';

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

export default function SwipeableTemporaryDrawer({ onLocaleToggle, locale }) {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState('');
  const [isTourEnabled, setIsTourEnabled] = React.useState(false);
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
        {
          //   sidebarMenuItems.map((menuItem, index) => (
          //   <React.Fragment key={uid(menuItem)}>
          //     <ListItem button onClick={() => handleClick(index)}>
          //       <ListItemText primary={menuItem.category} />
          //       {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
          //     </ListItem>
          //     <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
          //       <List component="div" disablePadding>
          //         {menuItem.children.map(subCategory => (
          //           <ListItem
          //             key={uid(subCategory)}
          //             component={Link}
          //             to={subCategory.route}
          //             button
          //             className={classes.nested}
          //           >
          //             <ListItemText primary={subCategory.label} />
          //           </ListItem>
          //         ))}
          //       </List>
          //     </Collapse>
          //   </React.Fragment>
          // ))
        }
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

          <div style={{ display: 'flex', flexDirection: 'row', gap: '0.8rem' }}>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Button color="secondary">
                <FormattedMessage {...messages.home} />
              </Button>
            </NavLink>
            <Button
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
              <FormattedMessage {...messages.howToUse} />
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
            <NavLink to="/resources" style={{ textDecoration: 'none' }}>
              <Button color="secondary">
                <FormattedMessage {...messages.resources} />
              </Button>
            </NavLink>
            <NavLink to="/about" style={{ textDecoration: 'none' }}>
              <Button color="secondary">
                <FormattedMessage {...messages.about} />
              </Button>
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
