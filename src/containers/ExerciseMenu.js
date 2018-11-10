import React, { Component } from "react";
import { Menu } from "antd";
import { connect } from "react-redux";
import { selectExercise } from "../actions";
import { bindActionCreators } from "redux";
import { titleCase} from "../UtilityFunctions";

const SubMenu = Menu.SubMenu;

class ExerciseMenu extends Component {

    rootSubmenuKeys = Object.keys(this.props.exerciseList);

    state = {
        openKeys: [],
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    renderMenuItems = (subMenuItems) => {
        return subMenuItems.map((item) => {
            return <Menu.Item key={item} onClick={() => this.props.selectExercise(item)}>{titleCase(item)}</Menu.Item>
        });
    }


    renderMenu = () => {
        return this.rootSubmenuKeys.map((subMenu) => {
            return (
                <SubMenu key={subMenu} title={<span>{titleCase(subMenu)}</span>}>
                    {this.renderMenuItems(this.props.exerciseList[subMenu])}
                </SubMenu>
            );
        });
    }

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{  }}
            >
                {this.renderMenu()}
            </Menu>
        );
    }
}

function mapStateToProps(state) {
    return {
        exerciseList: state.exerciseList
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectExercise: selectExercise }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseMenu);