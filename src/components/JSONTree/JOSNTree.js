import React from 'react';
import './../../css/JSONTree.css';

class JSONTree extends React.Component {

    constructor() {
        super();
        this.state = { expand: false };
        this.generateLine.bind(this);
        this.handleExpandCollapse.bind(this);
    }

	handleExpandCollapse = (event) => {
        console.log("on handleExpandCollapse : ", this.state.expand);
        this.setState({expand : !this.state.expand});
	};

    /*static getDerivedStateFromProps(nextProps, prevState) {
        console.log("on getDerivedStateFromProps : ", nextProps, prevState);
        if (nextProps.expand !== prevState.expand) {
            console.log("1", nextProps.expand);
            return { expand: nextProps.expand };
        }
        else {
            console.log("2");
            return { expand: false};
        }
    }*/

    render1() {
        return this.generateLine(this.props.isLastElement, this.props.level, this.props.json, this.props.spacers, this.props.jkey, this.props.path);
    }

    render() {
        /*if(this.props.level > 2){
            return "";
        }*/
        let currentSpacer = this.props.isLastElement ? "└" : "├";
        if (this.props.level <= 1) {
            currentSpacer = " ";
        }

        let countOfKeys = 0;
        if (this.props.json != null) {
            countOfKeys = Object.keys(this.props.json).length;
        }
        //console.log("path:"+this.props.path + "< jkey:" + this.props.jkey + " islast:" + this.props.isLastElement);
        return (
            <React.Fragment>

                {this.props.jkey != null &&
                    <br />
                }
                {this.props.spacers != null &&
                    this.props.spacers.map((spacer, index) => {
                        if (spacer === "├") {
                            return <React.Fragment>│&nbsp;</React.Fragment>;
                        } else if (spacer === "└") {
                            return <React.Fragment>&nbsp;&nbsp;</React.Fragment>;
                        } else {
                            return <React.Fragment>&nbsp;&nbsp;</React.Fragment>;
                        }
                    })

                }
                {currentSpacer}
                {this.props.jkey != null &&
                    <span className="oprop" onClick={this.handleExpandCollapse}>
                        {this.props.jkey}
                        {(this.state.expand && this.props.level > 1) ? (Array.isArray(this.props.json) ? " []" : " {}") : ""}
                        {(!this.state.expand && this.props.level > 1) ? (Array.isArray(this.props.json) ? " [..]" : " {..}") : ""}
                    </span>
                }

                {(this.props.level <= 1 || this.state.expand) && this.props.json != null &&
                    Object.entries(this.props.json).map(([key, value], index) => {
                        //console.log("i:" + (i++) +" key : " + this.props.path + "." + key + " value : " + value);
                        if (value == null || typeof (value) != "object") {
                            return <React.Fragment>
                                {<br />}
                                {this.props.spacers != null &&
                                    this.props.spacers.map((spacer, index) => {
                                        if (spacer === "├") {
                                            return <React.Fragment>│&nbsp;</React.Fragment>;
                                        } else if (spacer === "└") {
                                            return <React.Fragment>&nbsp;&nbsp;</React.Fragment>;
                                        } else {
                                            return <React.Fragment>&nbsp;&nbsp;</React.Fragment>;
                                        }
                                    })

                                }
                                {
                                    (currentSpacer === "├" ? <React.Fragment>│&nbsp;</React.Fragment> : <React.Fragment>&nbsp;&nbsp;</React.Fragment>)
                                }
                                {countOfKeys - 1 === index ? "└" : "├"}
                                {
                                    <span key={"d" + this.props.path + "." + key} className="atprop">
                                        {" " + key + " : "// + ":" + this.props.jkey + ">" + this.props.spacers[0] + ">" + this.props.spacers[1] + ">" + this.props.spacers[2] + ">" + this.props.spacers[3] + ">" + this.props.spacers[4]
                                        }
                                    </span>

                                }
                                {value}
                            </React.Fragment>
                        } else {
                            //console.log("key:" + key + " countOfKeys : " + countOfKeys + " last:" + (countOfKeys - 1 === index) + " index:" + index);
                            return <JSONTree key={"j" + this.props.path + "." + key}
                                json={value}
                                level={this.props.level + 1}
                                path={this.props.path + "." + key}
                                jkey={key}
                                isLastElement={countOfKeys - 1 === index}
                                spacers={[...this.props.spacers, currentSpacer]}
                                expand={false}/>;
                        }
                    })
                }
            </React.Fragment>
        );
    }

    generateLine(isLastElement, level, json, spacers, jkey, path) {
        let currentSpacer = isLastElement ? "└" : "├";
        if (level <= 1) {
            currentSpacer = " ";
        }

        let countOfKeys = 0;
        if (json != null) {
            countOfKeys = Object.keys(json).length;
        }

        //console.log("path:"+this.props.path + "< jkey:" + this.props.jkey + " islast:" + this.props.isLastElement);
        return (
            <React.Fragment>

                {<br />}
                {spacers != null &&
                    spacers.map((spacer, index) => {
                        if (spacer === "├") {
                            return <React.Fragment>│&nbsp;</React.Fragment>;
                        } else if (spacer === "└") {
                            return <React.Fragment>&nbsp;&nbsp;</React.Fragment>;
                        } else {
                            return <React.Fragment>&nbsp;&nbsp;</React.Fragment>;
                        }
                    })

                }
                {currentSpacer}
                {jkey != null &&
                    <span className="oprop">
                        {" " + jkey}
                        {level > 1 ? (Array.isArray(json) ? " []" : " {}") : ""}
                    </span>
                }

                {json != null &&
                    Object.entries(json).map(([key, value], index) => {
                        //console.log("i:" + (i++) +" key : " + path + "." + key + " value : " + value);
                        if (value == null || typeof (value) != "object") {
                            return <React.Fragment>
                                {<br />}
                                {spacers != null &&
                                    spacers.map((spacer, index) => {
                                        if (spacer === "├") {
                                            return <React.Fragment>│&nbsp;</React.Fragment>;
                                        } else if (spacer === "└") {
                                            return <React.Fragment>&nbsp;&nbsp;</React.Fragment>;
                                        } else {
                                            return <React.Fragment>&nbsp;&nbsp;</React.Fragment>;
                                        }
                                    })

                                }
                                {
                                    (currentSpacer === "├" ? <React.Fragment>│&nbsp;</React.Fragment> : <React.Fragment>&nbsp;&nbsp;</React.Fragment>)
                                }
                                {countOfKeys - 1 === index ? "└" : "├"}
                                {
                                    <span key={"d" + path + "." + key} className="atprop">
                                        {" " + key + " : "// + ":" + jkey + ">" + spacers[0] + ">" + spacers[1] + ">" + spacers[2] + ">" + spacers[3] + ">" + spacers[4]
                                        }
                                    </span>

                                }
                                {value}
                            </React.Fragment>
                        } else {
                            return this.generateLine(
                                countOfKeys - 1 === index,
                                level + 1,
                                value,
                                [...spacers, currentSpacer],
                                key,
                                path + "." + key
                            );
                        }
                    })
                }
            </React.Fragment>
        );
    }
}

export default JSONTree;
