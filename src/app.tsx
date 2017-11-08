import * as ReactDOM from "react-dom";
import * as React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import {HelloWorld} from "./helloworld";
import {Counter} from "./counter";
import {Counter2} from "./counter2";
import {Counter3} from "./counter3";
import {Counter4} from "./counter4";
import {Counter5} from "./counter5";
import ColorPicker from "./colorpicker";
import ShapeMaker from './shapemaker';
import ShapeViewer from './shapeviewer';
import ActionPlayer from './actionplayer';

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

let actions = [];
let defaultState = { nextShapeId:0, width: 100, height: 100, color:"#000000", shapes:[] };

let store3 = createStore(
    (state, action) => {
        actions.push(action);
        switch (action.type) {
            case 'COUNTER_CHANGE':
                //Object.assign
                return { ...state, [action.field]: state[action.field] + action.by };
            case 'COLOR_CHANGE':
                return { ...state, color: action.color };
            case 'SHAPE_ADD':
                var id = state.nextShapeId;
                var shape = { ...action, id : id };
                delete shape['type'];
                return { ...state, nextShapeId: id + 1, shapes: [...state.shapes, shape] };
            case 'SHAPE_CHANGE':
                shape = {...state.shapes.filter(x => x.id === action.id)[0], top: action.top, left: action.left };
                return { ...state, shapes: [...state.shapes.filter(x => x.id !== action.id), shape] }
            case 'LOAD':
                return action.state;
            default:
                return state;
        }
    },
    defaultState);

/* class ColorWrapperBase extends React.Component<any,any> {
    render() {
        return <ColorPicker color={this.props.color} onChange={this.props.setColor} />;
    }
}

const ColorWrapper = connect(
    (state) => ({ color: state.color }),
    (dispatch) => ({ setColor: (color) => dispatch({ type:'COLOR_CHANGE', color })})
)(ColorWrapperBase); */

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
  <Counter4 />
</Provider>,
document.getElementById("content4"));
ReactDOM.render(
<Provider store={store3}>
        <table>
            <tbody>
            <tr>
                <td style={{ width: 220 }}>
                    <Counter5 field="width" step={10} />
                    <Counter5 field="height" step={10} />
                    {/* <ColorWrapper /> */}
                    <ColorPicker />
                </td>
                <td style={{verticalAlign:"top", textAlign:"center", width:500}}>
                    <h2>Preview</h2>
                    <ShapeMaker />
                </td>
                <td style={{ verticalAlign: 'bottom' }}>
                    <ActionPlayer store={store3} actions={actions} defaultState={defaultState} />
                </td>
            </tr>
            <tr>
                <td colSpan={3}>
                    <h2 style={{margin:5,textAlign:'center'}}>Shapes</h2>
                    <ShapeViewer />
                </td>
            </tr>
            </tbody>
        </table>
</Provider>,
document.getElementById("content5"));
