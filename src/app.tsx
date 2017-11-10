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
import reducers from './reducers';
import History from './history';
import $ from 'jquery';

$( document ).ready(function() {
    $( 'body' ).append("<div id='content'>")
    $( 'body' ).append("<div id='content1'>")
    $( 'body' ).append("<div id='content2'>")
    $( 'body' ).append("<div id='content3'>")
    $( 'body' ).append("<div id='content4'>")
    $( 'body' ).append("<div id='content5'>")
    $( 'body' ).append("<div id='content6'>")
    start_render();
});

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

var history = {
    states: [],
    stateIndex: 0,
    reset() {
        this.states = [];
        this.stateIndex = -1;
    },
    prev() { return this.states[--this.stateIndex]; },
    next() { return this.states[++this.stateIndex]; },
    goTo(index) { return this.states[this.stateIndex=index]; },
    canPrev() { return this.stateIndex <= 0; },
    canNext() { return this.stateIndex >= this.states.length - 1; },
    pushState(nextState) {
        this.states.push(nextState);
        this.stateIndex = this.states.length - 1;
    }
};

let store4 = createStore(
    (state, action) => {
        var reducer = reducers[action.type];
        var nextState = reducer != null
            ? reducer(state, action)
            : state;

        if (action.type !== 'LOAD')
         {
             history.pushState(nextState);
             console.log(history);
         }

        return nextState;
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
let start_render = () => {

    ReactDOM.render(<HelloWorld />, document.getElementById("content"));
    ReactDOM.render(<Counter />, document.getElementById("content1"));
    ReactDOM.render(<Counter2 />, document.getElementById("content2"));
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
                        <td style={{ verticalAlign: "top", textAlign: "center", width: 500 }}>
                            <h2>Preview</h2>
                            <ShapeMaker />
                        </td>
                        <td style={{ verticalAlign: 'bottom' }}>
                            <ActionPlayer store={store3} actions={actions} defaultState={defaultState} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <h2 style={{ margin: 5, textAlign: 'center' }}>Shapes</h2>
                            <ShapeViewer />
                        </td>
                    </tr>
                </tbody>
            </table>
        </Provider>,
        document.getElementById("content5"));

    ReactDOM.render(
        <Provider store={store4}>
            <table>
                <tbody>
                    <tr>
                        <td style={{ width: 220 }}>
                            <Counter5 field="width" step={10} />
                            <Counter5 field="height" step={10} />
                            {/* <ColorWrapper /> */}
                            <ColorPicker />
                        </td>
                        <td style={{ verticalAlign: "top", textAlign: "center", width: 500 }}>
                            <h2>Preview</h2>
                            <ShapeMaker />
                        </td>
                        <td style={{ verticalAlign: "top" }}>
                            <h2>History</h2>
                            <History store={store4} history={history} defaultState={defaultState} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <h2 style={{ margin: 5, textAlign: 'center' }}>Shapes</h2>
                            <ShapeViewer />
                        </td>
                    </tr>
                </tbody>
            </table>
        </Provider>,
        document.getElementById("content6"));
}