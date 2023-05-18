import {screen, render, within} from "@testing-library/react";
import UserList from "./serList";

function renderComponent (){
    const users = [
        {name: "jane", email: "jane@jane.com"},
        {name: "same", email: "sam@sam.com"}
    ];
    render(< UserList users={users}/>)

    return {users, };
}

test("render one row per user",()=>{
    renderComponent();

    // const rows = screen.getAllByRole("row"); this is may be problemaic to choose correct row
   // const rows = within(screen.getByTestId("users")).getAllByRole("row");
   const rows = within(screen.getByTestId("users")).getAllByRole("row");
    expect(rows).toHaveLength(2);

    //screen.logTestingPlaygroundURL(); this will give you a link for your component
    //to give you a recommendation selector for your elemnt

})

test("render email and name for each user",()=>{
const {users} = renderComponent();
for (let user of users){
    const name = screen.getByRole("cell", {name: user.name});
    const email = screen.getByRole("cell", {name: user.email});
    
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
}


})