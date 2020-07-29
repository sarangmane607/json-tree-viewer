import React from 'react';
import TreeNode from './TreeNode';

class JSONTree extends React.Component {
    constructor() {
        super();
    }

    render() {
        /*if(this.props.level > 2){
            return "";
        }*/
        let currentSpacer = this.props.isLastElement ? "└" : "├";
        if(this.props.level <= 1){
            currentSpacer = " ";
        }

        let countOfKeys = 0;
        if(this.props.json != null){
            countOfKeys = Object.keys(this.props.json).length;
        }
        //console.log("path:"+this.props.path + "< jkey:" + this.props.jkey + " islast:" + this.props.isLastElement);
        return (
            <React.Fragment>

                {
                    <div>
                        {this.props.spacers != null &&
                            this.props.spacers.map((spacer, index) =>{
                                if(spacer == "├"){
                                    return <span key={"s" + this.props.path + "." + index}>│&nbsp;</span>;
                                }else if(spacer == "└"){
                                    return <span key={"s" + this.props.path + "." + index}>&nbsp;&nbsp;</span>;
                                }else{
                                    return <span key={"s" + this.props.path + "." + index}>&nbsp;&nbsp;</span>;
                                }
                            })
                        }
                        {
                           <span key={"sss" + this.props.path + "."}>{currentSpacer}</span>
                        }
                        {this.props.jkey != null &&
                            <span style={{color:"#1688ea", fontWeight:"bold"}}>
                                {" " + this.props.jkey}
                                {this.props.level > 1 ? (Array.isArray(this.props.json) ? " []" : " {}") : ""}
                                
                            </span>
                        }
                    </div>
                }

                {this.props.json != null &&
                    Object.entries(this.props.json).map(([key, value], index) => {
                        //console.log("i:" + (i++) +" key : " + this.props.path + "." + key + " value : " + value);
                        if (value == null || typeof (value) != "object") {
                            let level = this.props.level + 1;
                            /*if(level > 2){
                                return "";
                            }*/
                            return <React.Fragment>
                                {this.props.spacers != null &&
                                    this.props.spacers.map((spacer, index) =>{
                                        if(spacer == "├"){
                                            return <span key={"s" + this.props.path + "." + index}>│&nbsp;</span>;
                                        }else if(spacer == "└"){
                                            return <span key={"s" + this.props.path + "." + index}>&nbsp;&nbsp;</span>;
                                        }else{
                                            return <span key={"s" + this.props.path + "." + index}>&nbsp;&nbsp;</span>;
                                        }
                                    })
                                }
                                {
                                   (currentSpacer == "├" ? <span key={"cs" + this.props.path}>│&nbsp;</span> : <span key={"cs" + this.props.path}>&nbsp;&nbsp;</span>)
                                }
                                {
                                    <span key={"s" + this.props.path + "."}>{countOfKeys - 1 == index ? "└" : "├"}</span>
                                }
                                {
                                    <span key={"d" + this.props.path + "." + key} style={{color:"#ff9800"}}>
                                        {" " + key + " : "// + ":" + this.props.jkey + ">" + this.props.spacers[0] + ">" + this.props.spacers[1] + ">" + this.props.spacers[2] + ">" + this.props.spacers[3] + ">" + this.props.spacers[4]
                                        }
                                    </span>
                                    
                                }
                                {value}
                                {<br />}
                            </React.Fragment>
                        } else {
                            return <JSONTree key={"j" + this.props.path + "." + key}
                                json={value}
                                level={this.props.level + 1}
                                path={this.props.path + "." + key}
                                jkey={key}
                                isLastElement={countOfKeys - 1 == index}
                                spacers={[...this.props.spacers, currentSpacer]}/>;
                        }
                    })
                }
            </React.Fragment>
        );
    }
}

export default JSONTree;
