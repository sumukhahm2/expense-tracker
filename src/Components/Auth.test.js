import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AuthForm from './AuthForm'

describe('Authentication Component',()=>{
    test('switch to login page',()=>{
        //Arrange
        render(<AuthForm/>)
        //act
        const buttonElement=screen.getByRole('button')
        userEvent.click(buttonElement)

        //Assert
        const outputElement=screen.getByText('signup')
        expect(outputElement).toBeInTheDocument()
    })
})

