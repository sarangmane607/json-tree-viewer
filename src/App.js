import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import './css/App.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
          <div style={{height:"100%", width:"100%"}}>{children}</div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
	height:"100%"
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
	console.log("newValue : ", newValue);
  };

  console.log("value : ", value);
  return (
    <div className={classes.root}>
	  <div class="box">
		  <div class="row header" style={{zIndex:1}}>
			  <AppBar position="static">
				<Tabs
				  variant="scrollable"
				  value={value}
				  onChange={handleChange}
				  aria-label=""
				>
				  <LinkTab label="Input Text" href="/drafts" {...a11yProps(0)} />
				  <LinkTab label="JSON" href="/trash" {...a11yProps(1)} />
				</Tabs>
			  </AppBar>
		  </div>
		  <div class="row content">
			  <TabPanel value={value} index={0} style={{height:"100%"}}>
				<div class="box">
					<div class="row content">
						<div style={{position:"absolute", right:"0px", bottom:"0px", marginBottom:"15px"}}>
							<Fab size='small' variant="extended" style={{float:"right", textTransform:"none", marginTop:"10px", marginRight:"10px"}}> Clear </Fab>
							<Fab size='small' variant="extended" style={{float:"right", textTransform:"none", marginTop:"10px", marginRight:"10px"}}> Remove White Space </Fab>
							<Fab size='small' variant="extended" style={{float:"right", textTransform:"none", marginTop:"10px", marginRight:"10px"}}> Copy </Fab>
							<Fab size='small' variant="extended" style={{float:"right", textTransform:"none", marginTop:"10px", marginRight:"10px"}}> Paste </Fab>
							<Fab size='small' variant="extended" style={{float:"right", textTransform:"none", marginTop:"10px", marginRight:"10px"}}> Format </Fab>
						</div>
						<textarea
						  style={{height:"100%", width:"100%", boxSizing:"border-box", resize:"none", border:"none", outline: "none"}}
						  autocomplete="off"
						/>
					</div>
				</div>
			  </TabPanel>
			  <TabPanel value={value} index={1}>
				Json tree comes here...
			  </TabPanel>
		  </div>
	  </div>
    </div>
  );
}