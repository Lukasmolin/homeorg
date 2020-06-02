import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';


export default function Login() {
    return (<main>
        <Container>
            <div class="login">
                <form class="loginForm">
                    <div class="textInputs">
                        <TextField label="Login" />
                        <TextField label="Password" type="password" />
                    </div>
                    <div class="buttonInputs">
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary">
                        Create
                    </Button>
                    </div>
                
                </form>
            </div>     
        </Container>
    </main>);

}