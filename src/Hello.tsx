import React, { SyntheticEvent } from "react";
import { useState } from "react";

export interface Props {
    name : string;
    enthusiasmLevel ?: number;
}

// function Hello({name, enthusiamLevel = 1} : Props) {
//   if (enthusiamLevel <= 0) {
//     throw new Error("You could be a little more enthusiastic. :D");
//   }

//   return (
//      <div className="hello">
//         <div className="greeting">
//             Hello {name + getExclamationMarks(enthusiamLevel)}
//         </div>
//      </div>
//   );
// }

interface State {
    currentEnthusiasmLevel : number;
}

class Hello extends React.Component<Props, State> {
    state = {currentEnthusiasmLevel : this.props.enthusiasmLevel || 1}

    onIncrement = (event : SyntheticEvent) => {
        console.log(event)
        this.updateEnthusiasm(1);
    };

    onDecrement = (event : SyntheticEvent) => {
        console.log(event)
        this.updateEnthusiasm(-1);
    }

    render() {
        const { name} = this.props;
    
        if (this.state.currentEnthusiasmLevel <= 0) {
          throw new Error("You could be a little more enthusiastic. :D");
        }
    
        return (
          <div className="hello">
            <div className="greeting">
              Hello {name + getExclamationMarks(this.state.currentEnthusiasmLevel)}
            </div>
            <div>
                <button onClick={this.onIncrement}>+</button>
                <button onClick={this.onDecrement}>-</button>
            </div>
          </div>
        );
      }

      updateEnthusiasm(inc : number) {
        this.setState((currentState) => {
           return {currentEnthusiasmLevel : currentState.currentEnthusiasmLevel + inc};
        });
      }
}

export default Hello;

function getExclamationMarks(enthusiamLevel : number) {
     return Array(enthusiamLevel + 1).join("!");
}