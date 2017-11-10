export const addShape = (state, action) => {
    var id = state.nextShapeId;
    var shape = {...action, id: id };
    delete shape['type'];
    return { ...state, nextShapeId: id + 1, shapes: [...state.shapes, shape] };
};

export const changeShape = (state, action) => {
    var shape = {...state.shapes.filter(x => x.id === action.id)[0], 
        top: action.top, left: action.left };
    return { ...state, shapes: [...state.shapes.filter(x => x.id !== action.id), shape] };
};