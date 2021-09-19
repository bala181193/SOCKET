import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import './login.css'
function Login() {

    const [user,setname]=useState('');
    const [room,setroome ]=useState('');
  return (
      <>
    <div >
		<div class="d-flex justify-content-center h-100">
			<div class="user_card">
				<div class="d-flex justify-content-center">
					<div class="brand_logo_container">
						<img src="https://cdn.freebiesupply.com/logos/large/2x/pinterest-circle-logo-png-transparent.png" class="brand_logo" alt="Logo" />
					</div>
				</div>
				<div class="d-flex justify-content-center form_container">
					<form>
						<div class="input-group mb-3">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-user"></i></span>
							</div>
							<input type="text" name="name" class="form-control input_user" 
                            value={user} 
                            onChange={(e)=>setname(e.target.value)}
                            placeholder="username" />
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-key"></i></span>
							</div>
							<input type="text" name="room" class="form-control input_pass" 
                            value={room}
                            onChange={(e)=>setroome(e.target.value)}
                            placeholder="Room" />
						</div>
						
							<div class="d-flex justify-content-center mt-3 login_container">
                                <Link onClick={(e)=>(!user||!room)?e.preventDefault():null} 
                               to={`/chat?name=${user}&room=${room}`} >
				 	<button type="button" name="button" class="btn login_btn">Login</button>
                     </Link>
				   </div>
					</form>
				</div>
		
				
			</div>
		</div>
	</div>
  </>
  );
}

export default Login;
