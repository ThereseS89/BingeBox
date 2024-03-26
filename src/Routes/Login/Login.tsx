import './login.scss'
import { isValidEmail } from '../../Utils/regularUtils';
import { useState } from 'react';
import { handleLoginAuth } from '../../APIFunctions/Auth'
import {  useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from '../../Utils/atoms';

const Login = () => {
	const [isValidEmailState, setIsValidEmailState ] = useState(true)
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [errorMessage, setErrorMessage] = useState('') 
	const [ isInputValue, setIsInputValue ] = useState(false)
	const setIsloggedIn = useSetRecoilState<boolean>(isLoggedInState) 


	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {	
		setEmail(event.target.value);
		if (!isInputValue) {
			setIsInputValue(true)
		
		} else {
			setIsInputValue(false)
		}
	}

	const handleEmailBlur = (): void => {
		isValidEmail(email) 
		if(!isValidEmail(email)) {
			setIsValidEmailState(false)
			setErrorMessage('Felaktig mejladress')
			
		} else {
			setErrorMessage('')
			setIsValidEmailState(true); 
		}
	}
	const navigate = useNavigate()
	const handlebuttonClick = async (email: string, password: string) => {
		try {
			const response = await handleLoginAuth(email, password);

			const { token } = response;

			localStorage.setItem('token', token);
			
			navigate('/myPage')
			setIsloggedIn(true)
		} catch (error) {
			console.error('Fel vid inloggning:' , error)
			setErrorMessage('Felaktiga inloggningsuppgifter')
		}
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handlebuttonClick(email, password)
	}

	return (
		<div className="login-wrapper">
			<div className="form-wrapper">

				<h4 className="uppercase barlowCon fontyellow">Logga in</h4>
				<form onSubmit={handleSubmit}>
				<div>
					<p className="fontwhite">Emailadress</p>
					
					<input 
						placeholder="email"
						value={email}
						onChange={handleEmailChange}
						onBlur={handleEmailBlur}
						required/>
					{!isInputValue ? null :<p>{errorMessage}</p>}
				</div>
				
				<div>
					<p className="fontwhite"> Lösenord</p>
					<input
						onChange={(event) => setPassword(event.target.value)}
						value={password} 
						type="password"
						placeholder="lösenord"
						required/> 
				</div>
				
				<button 
					type="submit" 
					className='uppercase'>Logga in</button>
				</form>
			</div>
		</div>
	)
}

export default Login