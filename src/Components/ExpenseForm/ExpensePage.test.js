import React from 'react';
import { render,screen} from '@testing-library/react';
import store from '../Redux Store/ReduxStore'
import ExpensePage from './ExpensePage';
import userEvent from '@testing-library/user-event'

import { Provider } from 'react-redux';
 const component=<Provider store={store}><ExpensePage/></Provider>
describe('Expense Page',()=>{
    test('fetching data',async()=>{
        window.fetch=jest.fn()
        window.fetch.mockResolvedValueOnce({
         json:async()=>[{amount:100,description:'something',catagory:'movie'}]
        })
        render(component)
     
        const listItems=await screen.findAllByRole('generic')
        expect(listItems).not.toHaveLength(0)
     
    })
    
})