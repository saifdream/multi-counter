// action identifiers
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";
const NEW = "NEW";

// action creators
const newCounter = (counter) => {
    return {
        type: NEW,
        payload: counter,
    };
};

const resetCounter = () => {
    return {
        type: RESET,
    };
};

const increment = (id) => {
    return {
        type: INCREMENT,
        payload: id,
    };
};

const decrement = (id) => {
    return {
        type: DECREMENT,
        payload: id,
    };
};

// initial state
const initialState = {
    currentCounter: {
        id: 1,
        incrementBy: 5,
        decrementBy: 2,
        value: 0
    },
    multiCounter: [
        {
            id: 1,
            incrementBy: 5,
            decrementBy: 2,
            value: 0
        }
    ],
};

// create reducer function
function counterReducer(state = initialState, action) {
    const multiCounter = [...state.multiCounter];
    switch (action.type) {
        case INCREMENT:
            let index1 = multiCounter.findIndex(counter => counter.id === action.payload);
            multiCounter[index1].value += multiCounter[index1].incrementBy;
            return { ...state, multiCounter, currentCounter: multiCounter[index1] };
        case DECREMENT:
            let index2 = multiCounter.findIndex(counter => counter.id === action.payload);
            multiCounter[index2].value -= multiCounter[index2].decrementBy;
            return { ...state, multiCounter, currentCounter: multiCounter[index2] };
        case RESET:
            const resetCounter = multiCounter.map((counter)=> ({...counter, value: 0}))
            console.log(resetCounter)
            return { ...state, multiCounter: resetCounter };
        case NEW:
            return {
                ...state,
                multiCounter: [...state.multiCounter, action.payload],
            };
        default:
            return state;
    }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    // console.dir(state.multiCounter)
    for (const iterator of state.multiCounter) {
        // console.dir(iterator)
        const counterEl = document.getElementById("counter-"+iterator.id);
        counterEl.innerText = iterator.value;
    }
    // const counterEl = document.getElementById("counter-"+state.currentCounter.id);
    // counterEl.innerText = state.currentCounter.value;
};

// update UI initially
render();

store.subscribe(render);

const resetAll = () => {
    store.dispatch(resetCounter());
}

const increamentHandeler = (id) => {
    // console.log(id)
    store.dispatch(increment(id));
}

const decreamentHandeler = (id) => {
    // console.log(id)
    store.dispatch(decrement(id));
}

const addNew = () => {
    const id = Date.now();
    const counterText = `counter-${id}`;
    const incrementId = `increment-${id}`;
    const decrementId = `decrement-${id}`;

    const counter = `<div class="mx-auto max-w-md mt-10 space-y-5">
        <div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
            <div id="`+counterText+`" class="text-2xl font-semibold">`+0+`</div>
            <div class="flex space-x-3">
                <button
                    class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
                    onclick="increamentHandeler(`+ id +`)"
                    id="`+incrementId+`"
                >
                    Increment
                </button>
                <button
                    class="bg-red-400 text-white px-3 py-2 rounded shadow"
                    onclick="decreamentHandeler(`+ id +`)"
                    id="`+decrementId+`"
                >
                    Decrement
                </button>
            </div>
        </div>
    </div>`;

    const parent = document.getElementById("multi-counter");
    parent.insertAdjacentHTML('beforeend', counter);

    const incrementBy = document.getElementById("increment-by");
    const decrementBy = document.getElementById("decrement-by");
    store.dispatch(newCounter({
        id,
        incrementBy: +incrementBy.value || 5,
        decrementBy: +decrementBy.value || 2,
        value: 0
    }));
    // console.log(incrementBy.value, decrementBy.value)
    incrementBy.value = "";
    decrementBy.value = "";
}