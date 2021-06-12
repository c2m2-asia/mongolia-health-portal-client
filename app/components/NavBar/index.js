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
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import { Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CloseIcon from '@material-ui/icons/Close';
import { Steps } from 'intro.js-react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import 'intro.js/introjs.css';
import ukFlag from 'images/uk-flag.svg';
import mnFlag from 'images/mn-flag.svg';

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
    // marginRight: '1rem',
  },
  title: {
    flexGrow: 1,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
  headSection: {
    width: 200,
  },
  menuItemsContainer: {
    display: 'flex',
    gap: '2.5rem',
  },
  menuItemContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    alignItems: 'center',
  },
  button: {
    textTransform: 'none',
    fontWeight: '500',
  },
  appBar: {
    paddingLeft: '1.5rem',
    paddingRight: '10px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '14px',
      paddingRight: '0',
    },
  },
}));

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, char =>
          String.fromCodePoint(char.charCodeAt(0) + 127397),
        )
    : isoCode;
}

function SwipeableTemporaryDrawer({ onLocaleToggle, locale, children }) {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState('');
  const [isTourEnabled, setIsTourEnabled] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const steps = [
    {
      element: '.selector1',
      intro:
        locale === 'en'
          ? 'This is the filter selection section.'
          : 'Энэ хэсэгт сонголтоор хайлт хийнэ',
      position: 'right',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.selector2',
      intro:
        locale === 'en'
          ? 'You can select either health services or pharmacies.'
          : 'Эрүүл мэндийн үйлчилгээ эсвэл эмийн сангаар хайж болно',
    },
    {
      element: '.selector3',
      intro:
        locale === 'en'
          ? 'Select the desired location.'
          : 'Хайлт хийх газраа сонгоно',
    },
    {
      element: '.selector4',
      intro:
        locale === 'en'
          ? 'Select filters related to speciality, wheelchair access, categories, operator type or operating hours. Scroll down to see others filters.'
          : 'Нарийн мэргэжил, тэргэнцэртэй иргэдэд хүртээмжтэй эсэх, үйлчилгээний төрөл, ажиллах цагаар хайх. Доош гүйлгэж бусад сонголтыг харах',
    },
    {
      element: '.selector5',
      intro:
        locale === 'en'
          ? "Once you've selected the filters, click here to apply the filters you've selected"
          : 'Шүүлтүүрийг сонгосны дараа энд дарж сонгосон шүүлтүүрээ ашиглана уу',
    },
    {
      element: '.selector6',
      intro:
        locale === 'en'
          ? 'The map shows all the POIs that fall under the applied filters. Click on any location marker to view its detail.'
          : 'Энэ хэсэгт хайлтын сонголтод тохирсон эрүүл мэндийн үйлчилгээнүүд харагдана. Үйлчилгээн дээр дарж дэлгэрэнгүй мэдээллийг харах.',
    },
    {
      element: '.selector7',
      intro:
        locale === 'en'
          ? 'Type your query here to search for keywords.'
          : 'Энэ хэсэгт түлхүүр үгээр хайлт хийнэ',
    },
    {
      element: '.selector8',
      intro:
        locale === 'en'
          ? 'Download the data displayed in the map by clicking this download button.'
          : 'Хайлтаар гарч ирсэн мэдээллийг энэ товчин дээр дарж татаж авна',
    },
  ];

  const handleLanguageClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar
        position="static"
        color="white"
        elevation={0}
        style={{ borderBottom: '1px solid rgba(105,105,105,0.33)' }}
        className={classes.appBar}
      >
        <Toolbar disableGutters>
          <Typography variant="h6" className={classes.title}>
            <FormattedMessage {...messages.projectTitle} />
          </Typography>
          <Hidden mdUp>
            <IconButton
              className={classes.menuButton}
              onClick={() => setOpen(true)}
              aria-label="Open Navigation"
            >
              <MenuIcon color="primary" />
            </IconButton>
          </Hidden>

          <Hidden smDown>
            <div
              style={{ display: 'flex', flexDirection: 'row', gap: '0.8rem' }}
            >
              <NavLink to="/" style={{ textDecoration: 'none' }}>
                <Button className={classes.button} color="secondary">
                  <FormattedMessage {...messages.home} />
                </Button>
              </NavLink>
              <Button
                className={classes.button}
                color="secondary"
                startIcon={locale === 'en' ? <img src={ukFlag} height="16px" /> : <img src={mnFlag} height="16px" />}
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
                  onClick={() => onLocaleToggle('en')}
                  data-my-value="English"
                >
                  <span>
                    <img src={ukFlag} height="16px" />
                  </span>
                  &nbsp;&nbsp;English
                </MenuItem>
                <MenuItem
                  onClick={() => onLocaleToggle('mn')}
                  data-my-value="Mongolia"
                >
                  <span>
                    <img src={mnFlag} height="16px" />
                  </span>
                  &nbsp;&nbsp;монгол
                </MenuItem>
              </Menu>

              <Button
                className={classes.button}
                color="secondary"
                onClick={() => setIsTourEnabled(true)}
              >
                <FormattedMessage {...messages.howToUse} />
              </Button>
              <Steps
                enabled={isTourEnabled}
                steps={steps}
                initialStep={0}
                onExit={() => setIsTourEnabled(false)}
                options={{
                  nextLabel: locale === 'en' ? 'Next' : 'Дараачийн',
                  prevLabel: locale === 'en' ? 'Previous' : 'Өмнөх',
                  skipLabel: locale === 'en' ? 'Skip' : 'Алгасах',
                  doneLabel: locale === 'en' ? 'Done' : 'Дууссан',
                  scrollToElement: false,
                  showStepNumbers: false,
                }}
              />
              <NavLink to="/resources" style={{ textDecoration: 'none' }}>
                <Button className={classes.button} color="secondary">
                  <FormattedMessage {...messages.resources} />
                </Button>
              </NavLink>
              <NavLink to="/about" style={{ textDecoration: 'none' }}>
                <Button className={classes.button} color="secondary">
                  <FormattedMessage {...messages.about} />
                </Button>
              </NavLink>
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={open} onClose={onClose} anchor="right">
        <Toolbar className={classes.headSection}>
          <ListItem disableGutters>
            <ListItemIcon className={classes.closeIcon}>
              <IconButton onClick={onClose} aria-label="Close Navigation">
                <CloseIcon color="primary" />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </Toolbar>
        <List className={classes.blackList}>
          <div className={classes.menuItemContainerMobile}>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Button className={classes.button} color="secondary">
                <FormattedMessage {...messages.home} />
              </Button>
            </NavLink>
            <Button
              className={classes.button}
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
                onClick={() => onLocaleToggle('en')}
                data-my-value="English"
              >
                English
              </MenuItem>
              <MenuItem
                onClick={() => onLocaleToggle('mn')}
                data-my-value="Mongolia"
              >
                монгол
              </MenuItem>
            </Menu>

            {
              //   <Button
              //   className={classes.button}
              //   color="secondary"
              //   onClick={() => setIsTourEnabled(true)}
              // >
              //   <FormattedMessage {...messages.howToUse} />
              // </Button>
              // <Steps
              //   enabled={isTourEnabled}
              //   steps={steps}
              //   initialStep={0}
              //   onExit={() => setIsTourEnabled(false)}
              //   options={{
              //     nextLabel: locale === 'en' ? 'Next' : 'Дараачийн',
              //     prevLabel: locale === 'en' ? 'Previous' : 'Өмнөх',
              //     skipLabel: locale === 'en' ? 'Skip' : 'Алгасах',
              //     doneLabel: locale === 'en' ? 'Done' : 'Дууссан',
              //     scrollToElement: false,
              //     showStepNumbers: false,
              //   }}
              // />
            }
            <NavLink to="/resources" style={{ textDecoration: 'none' }}>
              <Button className={classes.button} color="secondary">
                <FormattedMessage {...messages.resources} />
              </Button>
            </NavLink>
            <NavLink to="/about" style={{ textDecoration: 'none' }}>
              <Button className={classes.button} color="secondary">
                <FormattedMessage {...messages.about} />
              </Button>
            </NavLink>
          </div>
        </List>
      </Drawer>
      {children}
    </div>
  );
}

export default SwipeableTemporaryDrawer;
