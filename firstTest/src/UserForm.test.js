import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows two inputs and a button', () => {
  // render the component
  render(<UserForm />);

  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  // Assertion - make sure the component is doing
  // what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted', () => {
  const mocker = jest.fn();
  // Try to render my component
  render(<UserForm onUserAdd={mocker} />);

  // Find the two inputs
  //const [nameInput, emailInput] = screen.getAllByRole('textbox');
  // this way it is not perfect here we have the issue of editing or adding to form so we will
  //have failed text

  const nameInput = screen.getByRole("textbox", {name: /name/i})
  const emailInput = screen.getByRole("textbox",  {name: /email/i})

  // Simulate typing in a name

  user.click(nameInput);
  user.keyboard('jane');

  // Simulate typing in an email
  user.click(emailInput);
  user.keyboard('jane@jane.com');

  // Find the button
  const button = screen.getByRole('button');

  // Simulate clicking the button
  user.click(button);

  // Assertion to make sure 'onUserAdd' gets called with email/name
   expect(mocker).toHaveBeenCalled();
  expect(mocker).toHaveBeenCalledWith({email: "jane@jane.com", name: "jane"});
});
test("empties the two input when the form is submitted", ()=>{
  render(< UserForm onUserAdd={()=>{}}/>)

  const userInput = screen.getByRole("textbox", {name: /name/i});
  const emailInput = screen.getByRole("textbox", {name: /email/i});

  const button = screen.getByRole("button");
  

  user.click(userInput);
  user.keyboard("jane");
  user.click(emailInput);
  user.keyboard("jane@jane.com");

  user.click(button);

  expect(userInput).toHaveValue("");
  expect(emailInput).toHaveValue("");


})