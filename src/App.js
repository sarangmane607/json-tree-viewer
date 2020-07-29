import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import GitHubIcon from '@material-ui/icons/GitHub';
import PropTypes from 'prop-types';
import React from 'react';
import JOSNTree from './components/JSONTree/JOSNTree';
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
				<div style={{ height: "100%", width: "100%" }}>{children}</div>
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
		height: "100%"
	},
}));

export default function NavTabs() {
	const classes = useStyles();
	console.log("classes:", classes);
	const [state, setValue] = React.useState({ value: 0, jsonTxt: "" });

	const handleChange = (event, newValue) => {
		setValue({ value: newValue, jsonTxt: state.jsonTxt });
		console.log("newValue : ", newValue);
	};


	const handleTextareaChange = (event, newValue) => {
		setValue({ value: state.value, jsonTxt: event.target.value });
		console.log("jsonTxt : ", event.target.value);
	};

	console.log("value : ", state.value);
	let parsedJSON = {};
	try{
		parsedJSON = JSON.parse(state.jsonTxt);
	}catch(e){
		parsedJSON = {error:"error while parsing json: " + e };
	}
	console.log("tab :" + state.value + " jsontxt : " + state.jsonTxt);
	return (
		<div className={classes.root}>
			<div class="box">
				<div class="row header" style={{ zIndex: 1 }}>
					<AppBar position="static">

						<Tabs
							variant="scrollable"
							value={state.value}
							onChange={handleChange}
							aria-label=""
						>
							<LinkTab label="Input Text" {...a11yProps(0)} />
							<LinkTab label="JSON" {...a11yProps(1)} />
							<GitHubIcon fontSize='1.8rem' style={{ alignSelf: "center", position: "absolute", right: "0px", marginRight: "10px", cursor: "hand" }} onClick={() => window.open("https://github.com/sarangmane607/json-tree-viewer", "_blank")} />
						</Tabs>
					</AppBar>
				</div>
				<div class="row content" style={{ overflow: "auto" }}>
					<TabPanel value={state.value} index={0} style={{ height: "100%" }}>
						<div class="box">
							<div class="row content">
								<div style={{ position: "absolute", right: "0px", bottom: "0px", marginBottom: "15px" }}>
									<Fab size='small' variant="extended" style={{ float: "right", textTransform: "none", marginTop: "10px", marginRight: "10px" }}> Clear </Fab>
									<Fab size='small' variant="extended" style={{ float: "right", textTransform: "none", marginTop: "10px", marginRight: "10px" }}> Remove White Space </Fab>
									<Fab size='small' variant="extended" style={{ float: "right", textTransform: "none", marginTop: "10px", marginRight: "10px" }}> Copy </Fab>
									<Fab size='small' variant="extended" style={{ float: "right", textTransform: "none", marginTop: "10px", marginRight: "10px" }}> Paste </Fab>
									<Fab size='small' variant="extended" style={{ float: "right", textTransform: "none", marginTop: "10px", marginRight: "10px" }}> Format </Fab>
								</div>
								<textarea onChange={handleTextareaChange}
									style={{ height: "100%", width: "100%", boxSizing: "border-box", resize: "none", border: "none", outline: "none" }}
									autocomplete="off"
									value={state.jsonTxt}
								/>
							</div>
						</div>
					</TabPanel>
					<TabPanel value={state.value} index={1} style={{ height: "100%", fontFamily: "Courier New", fontSize: "medium" }}>
						<div class="box">
							<div class="row content">
								<div style={{ height: "100%" }}>
									<br />
									<JOSNTree json={{ "JSON": parsedJSON }} level={0} path="" isLastElement={true} spacers={[]} />
								</div>
							</div>
						</div>
					</TabPanel>
				</div>
			</div>
		</div>
	);
}