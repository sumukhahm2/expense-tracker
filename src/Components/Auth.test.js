import React from 'react';
import { render,screen} from '@testing-library/react';
import store from '../Components/Redux Store/ReduxStore'; 
import AuthForm from './AuthForm';
import userEvent from '@testing-library/user-event'

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
 const component=<Provider store={store}>
 <AuthForm passwordReset={false}/>
</Provider>
describe('With React Testing Library', () => {
        test('test for SignUp text',()=>{
            render(component)
         expect(screen.getByText(/email id/i)).toBeInTheDocument;
        })
        test('test for confirm password text',()=>{
            render(component)
         expect(screen.getByText(/Confirm Password/i)).toBeInTheDocument;
        })
        test('renders login page after clicked on the login link',()=>{
            render(component)
           const loginLink=screen.getByText('LogIn')
            userEvent.click(loginLink)

            const output=screen.queryByText(/Confirm Password/i)
           
            expect(output).toBeNull()
             
        })
        test('test for forgot password text not be there while signup',()=>{
            render(component)
            const forgotPasswordLink=screen.queryByText(/forgot password?/i)
         expect(forgotPasswordLink).toBeNull();
        })
        test('test for forgot password text to be there while login',()=>{
            render(component)
            const loginLink=screen.getByText('LogIn')
            userEvent.click(loginLink)
            const forgotPasswordLink=screen.getByText(/forgot password?/i)
         expect(forgotPasswordLink).toBeInTheDocument;
        })
        test('if we are in sign up page check we have an option Already Have An Account?',()=>{
            render(component)
            const alreadyHaveAnAccount=screen.getByText(/Already Have An Account?/i)
            expect(alreadyHaveAnAccount).toBeInTheDocument;
        })
        test('if we are in sign up page check we have an option Already Have An Account?',()=>{
            render(component)
            const dontHaveAccount=screen.queryByText(/Dont Have An Account?/i)
            expect(dontHaveAccount).toBeNull();
        })
        test('if we are in Login  page check we have an option Dont Have An Account',()=>{
            render(component)
            const loginLink=screen.getByText('LogIn')
            userEvent.click(loginLink)
            const dontHaveAccount=screen.getByText(/Dont Have An Account?/i)
            expect(dontHaveAccount).toBeInTheDocument;
        })
        test('if we are in Login  page check we dont have link Already Have An Account',()=>{
            render(component)
            const loginLink=screen.getByText('LogIn')
            userEvent.click(loginLink)
            const alreadyHaveAnAccount=screen.queryByText(/Already Have An Account?/i)
            expect(alreadyHaveAnAccount).toBeNull;
        }) 
        test('if we click on forgot password it shows the email field only',()=>{
            render(component)
            const loginLink=screen.getByText('LogIn')
            userEvent.click(loginLink)
            const forgotPassword=screen.getByText(/forgot password/i)
            userEvent.click(forgotPassword)
            const emailField=screen.getByText(/Email Id/i)
            const password=screen.queryByText('Password') 
            const confirmPassword=screen.queryByText(/Confirm Password/i)
            expect(emailField).toBeInTheDocument;
            expect(password).toBeNull();
            expect(confirmPassword).toBeNull();
        }) 
    });
 