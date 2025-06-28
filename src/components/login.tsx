import { useEffect } from "react"
import { Link } from "react-router-dom"

const Login = () => {
  useEffect(() => {
    const user_name = document.getElementById('user_name') as HTMLInputElement
    const user_password = document.getElementById('user_password') as HTMLInputElement
    const btn = document.getElementById('login_button') as HTMLButtonElement

    btn.addEventListener('click', (e) => {

      e.preventDefault()
      if(user_name.value === '' || user_password.value === '') {    // check if fields are empty
        alert('Please fill in all fields')
        return
      }
      else{

        const userlogin = {     // create userlogin object
          user_name: user_name.value,
          user_password: user_password.value
        }

        const wss = new WebSocket('ws://localhost:8080')  // create websocket connection

        wss.onopen = () => {
          wss.send(JSON.stringify(userlogin))
          wss.onmessage = (e) => {
            const response = JSON.parse(e.data)  // parse the response from the server
            if(response.status === 'true'){

              <Link to="/dashboard"></Link>  // redirect to dashboard if login is successful

            }else{

              alert('Login failed. Please check your credentials.')  // show error message if login fails
              user_name.value = ''  // clear the input fields
              user_password.value = ''

            }
            
          }
        }

      }

    })



  }, [])

  return (
    <div id="login_container" className="login_container">
      <form id="login_form" className="login_form">
        <h1 className="login_title">LOG IN</h1>
        <input type="text" id="user_name" className="login_input" placeholder="Enter user name" required/>
        <input type="password" id="user_password" className="login_input" placeholder="Enter user password" required/>
        <button type="submit" id="login_button" className="login_button">Login</button>
      </form>

    </div>
  )
}

export default Login
