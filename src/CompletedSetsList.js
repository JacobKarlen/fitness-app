import React, { Component } from "react";
import CompletedSet from "./CompletedSet";

class CompletedSetsList extends Component {
    createSetItem = (set) => {
        return <CompletedSet
                key={set.set}
                set={set.set}
                weight={set.weight}
                reps={set.reps}
                rest={set.rest}
                unit={set.unit}
                />;
    }

    createSetItemList = (sets) => {
       const listNode = sets.map((set) => {
           return this.createSetItem(set);
       });
        return listNode;
    }

    render() {

        console.log("CSL", this.props);

        var sets = this.props.completedSets;
        var lastSet;
        // conditional render, only render lastSet if it actually exists
        if (this.props.lastSet) {
            lastSet = this.createSetItem(this.props.lastSet);
        } else {
            lastSet = <div></div>;
        }

        return (
            <div>
                {this.createSetItemList(sets)}
                {lastSet}
            </div>
        );
    }
}

export default CompletedSetsList;