import React from 'react';


class TreeNode extends React.Component {

    render() {
        let key, value;
        if (this.props.leaf) {
            return (<div style={{ paddingLeft: this.props.leftSpacing + "px" }}>
                {key + ":" + value}
            </div>);
        } else {
            //<JSONTree json={value} level={this.props.level+1} path={this.props.path + "."+ key}/>
        }
        return this.props.json
    }
}

export default TreeNode;