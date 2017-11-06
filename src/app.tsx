import * as ReactDOM from "react-dom";
import * as React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import {HelloWorld} from "./helloworld";
import {Counter} from "./counter";
import {Counter2} from "./counter2";
import {Counter3} from "./counter3";
import {CounterStateLess} from "./counter4";
import {Counter5} from "./counter5";
import {ColorPicker} from "./colorpicker";

let store = createStore(
    (state, action) => {
        switch (action.type) {
            case 'INCR':
                return { counter: state.counter + action.by };
            default:
                return state;
        }
    },
    { counter: 0 });

let store2 = createStore(
    (state, action) => {
        switch (action.type) {
            case 'INCR':
                return { counter: state.counter + action.by };
            default:
                return state;
        }
    },
    { counter: 0 });

let defaultState = { width: 100, height: 50, color:"#000000"};

let store3 = createStore(
    (state, action) => {
        switch (action.type) {
            case 'COUNTER_CHANGE':
                return Object.assign({}, state, { [action.field]: state[action.field] + action.by });
            case 'COLOR_CHANGE':
                return Object.assign({}, state, { color: action.color });
            default:
                return state;
        }
    },
    defaultState);

class ColorWrapperBase extends React.Component<any,any> {
    render() {
        return <ColorPicker color={this.props.color} onChange={this.props.setColor} />;
    }
}

const ColorWrapper = connect(
    (state) => ({ color: state.color }),
    (dispatch) => ({ setColor: (color) => dispatch({ type:'COLOR_CHANGE', color })})
)(ColorWrapperBase);

ReactDOM.render(<HelloWorld/>, document.getElementById("content"));
ReactDOM.render(<Counter/>, document.getElementById("content1"));
ReactDOM.render(<Counter2/>, document.getElementById("content2"));
ReactDOM.render(
<Provider store={store}>
  <Counter3 />
</Provider>,
document.getElementById("content3"));
ReactDOM.render(
<Provider store={store2}>
  <CounterStateLess />
</Provider>,
document.getElementById("content4"));
ReactDOM.render(
<Provider store={store3}>
  <div>
    <Counter5 field="width" step={10} />
    <Counter5 field="height" step={10} />
    <ColorPicker />
  </div>
</Provider>,
document.getElementById("content5"));
