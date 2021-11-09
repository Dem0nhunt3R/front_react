import {useState} from "react";

function App() {

    // useEffect(() => {
    //     fetch('http://localhost:8080/')
    //         .then(value => value.json())
    //         .then(value => {
    //             console.log(value)
    //         });
    // }, []);

    const [users, setUsers] = useState([]);
    console.log(users);
    const registration = (e) => {
        e.preventDefault();
        let userRequest = {
            login: e.target.login.value,
            password: e.target.password.value
        };

        fetch('http://localhost:8080/user/registration', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRequest)
        })
            .then(value => value.json())
            .then(value => setUsers(value))
    }


    const activate = (e) => {
        e.preventDefault();
        const value = e.target.id.value;
        fetch(`http://localhost:8080/user/activation/${value}`)
            .then(value => value.json())
            .then(value => console.log(value))

    }

    let token;
    const login = (e) => {
        e.preventDefault()
        const login = e.target.login.value;
        const password = e.target.password.value;
        const userLogin = {login, password};
        console.log(userLogin)
        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userLogin)
        })
            .then(value => value.headers.get('token'))
            .then(value => {
                token = value;
                console.log(token);
            })
    };

    const addProduct = (e) => {
        e.preventDefault();
        let value = e.target.title.value;
        let price = e.target.price.value;
        let product = {value, price};
        fetch('http://localhost:8080/user/addProduct', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(product)
        })
            .then(value => console.log(value))

    }

    return (
        <div>
            Connection with back end =)
            <hr/>
            <div>
                registration
                <form onSubmit={registration}>
                    <input type="text" name={'login'}/>
                    <input type="text" name={'password'}/>
                    <button>submit</button>
                </form>
            </div>
            <br/>
            activation
            <div>
                <form onSubmit={activate}>
                    <select name="id">
                        {
                            users.map(value => <option key={value.id} value={value.id}>user {value.id}</option>)
                        }
                    </select>
                    <button>activate</button>
                </form>
            </div>
            <br/>
            login
            <form onSubmit={login}>
                <input type="text" name={'login'}/>
                <input type="text" name={'password'}/>
                <button>login</button>
            </form>
            <br/>
            Add product
            <div>
                {/*<form onSubmit={addProduct}>*/}
                {/*    <input type="text" name={'title'}/>*/}
                {/*    <input type="number" name={'price'}/>*/}
                {/*    <button>submit</button>*/}
                {/*</form>*/}
            </div>
        </div>

    );
}

export default App;
