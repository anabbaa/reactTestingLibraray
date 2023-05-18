import {render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {createServer} from "../../testHelpers/server";
import AuthButtons from "./AuthButtons";
import { async } from "validate.js";
import { func } from "prop-types";
import { a } from "msw/lib/SetupApi-f4099ef3";
import { S } from "msw/lib/SetupServerApi-db0805bd";

async function renderComponent(){
     render(
        <MemoryRouter>
    < AuthButtons />
    </MemoryRouter>
    )
    await screen.findAllByRole("link");
    
}
describe("when user is not sign in", () =>{
    createServer([
        {
            path: "api/user",
            res: ()=>{
                return {
                    user: null
                }
            }
        }
    ])


    test("sign in and sign up are visible", async()=>{
        await renderComponent();

        const signinButton = screen.getByRole("link", { name: /sign in/i});
        const signupButton = screen.getByRole("link", {name: /sign up/i});

        expect(signinButton).toBeInTheDocument();
        expect(signinButton).toHaveAttribute("href", "/signin");
        expect(signupButton).toBeInTheDocument();
        expect(signupButton).toHaveAttribute("href","/signup")

    
    });
    
    test("sign out is not visible", async()=>{
         await renderComponent();
         const signOutButton = screen.queryByRole("link", {name: /sign out/i});
         expect(signOutButton).nit.toBe.toBeInTheDocument();

    });
    
})



describe("when user is signed in", ()=>{
    createServer([
        {
            path: "api/user",
            res: ()=>{
                return{
                    user : {id: 3, email: "asd@hh.com"}
                }
            }
        }
    ])
    
    test(" sign in and sign up are not visible", async()=>{
       await renderComponent();
       const signinButton = screen.queryByRole("link", {name: /sign in/i});
       const signupButton = screen.queryByRole("link", {name: /sign up/i});
       expect(signinButton).not.toBeInTheDocument1();
       expect(signupButton).not.toBeInTheDocument();
    
    });
    
    test("sign out is visible", async()=>{
        await renderComponent();
        const signOutButton = screen.getByRole("link", {nmae: /sign out/i});
        expect(signOutButton).toBeInTheDocument();
        expect(signOutButton).toHaveAttribute("href", "/signout");
    
    });
        
})


