state management libraries that support react18 and nextjs.

## Getting Started

First, install.

```bash
npm install jcstore
# or
yarn add jcstore
```

## Useage

create store.

```typescript

import { createStore } from 'jcstore';

const initState = {
    count: 0,
    name: 'jinech',
    detail: {
        name: 'detail name',
        list: new Array(10).fill('').map((_, index) => ({ name: `name${index}` }))
    }
};

const store = createStore();

export default store;
export type InitState = typeof initState;
```

Use in the page.

```tsx
'use client'

import { useStore } from 'jcstore';
import store from './store';
import type { InitState } from './store';

const A = function() {
    const [state, setState] = useStore<InitState>(store);

    return (
        <div>
            <h1>A</h1>
            <h2>{state.count}</h2>
            <ul>
                <li>
                    {state.detail.list?.map((item, index) => (
                        <span key={index}>{item.name}</span>
                    ))}
                </li>
            </ul>
            <button
                type='primary'
                onClick={() => setState(draft => { draft.detail.list.push({ name: `${+new Date()}` }) })}
            >add list</button>
        </div>
    );
};
const B = function() {
    const [state, setState] = useStore<InitState>(store);

    return (
        <div>
            <h1>B</h1>
            <ul>
                <li>
                    {state.detail.list?.map((item, index) => (
                        <span key={index} color='processing'>{item.name}</span>
                    ))}
                </li>
            </ul>
            <button
                type='primary'
                onClick={() => setState(draft => { draft.detail.list[1].name = +new Date() })}
            >change 2th</button>
        </div>
    );
};

export default function() {
    return (
        <div>
            <A />
            <B />
        </div>
    );
};
```
