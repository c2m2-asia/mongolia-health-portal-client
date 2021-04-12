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
                nextLabel: locale === 'en' ? 'Next' : 'Дараачийн',
                prevLabel: locale === 'en' ? 'Previous' : 'Өмнөх',
                skipLabel: locale === 'en' ? 'Skip' : 'Алгасах',
                doneLabel: locale === 'en' ? 'Done' : 'Дууссан',
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
