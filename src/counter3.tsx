import * as React from 'react';
//for PropTypes , npm install prop-types --save
import PropTypes from 'prop-types';

export class Counter3 extends React.Component<any, any> {
    context: any;
    static contextTypes = {
        store: PropTypes.object
    }
    private unsubscribe: Function;
    componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => this.forceUpdate());
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return (
            <div>
                <p>
                    <label>Counter redux provider: </label><b>#{this.context.store.getState().counter}</b>
                </p>
                <button onClick={e => this.context.store.dispatch({ type:'INCR', by: 1 }) }>INCREMENT</button>
                <span style={{ padding: "0 5px" }} />
                <button onClick={e => this.context.store.dispatch({ type:'INCR', by: -1 }) }>DECREMENT</button>
            </div>
        );
    }
}
