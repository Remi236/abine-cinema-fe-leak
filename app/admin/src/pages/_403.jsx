import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

const Error_Server_Page = () => {
	
	useEffect(() => {
		document.title = "Forbidden Page";
	},[]);

	return (
		<div id="notfound">
			<div className="notfound forbidden">
				<div className="notfound-404">
					<h1>403</h1>
				</div>
				<h2>Oops! It's look like you're not allow to pass here !</h2>
				<p>Hmm... dark dark bruh bruh lmao :v you shall not pass here. you need to <Link to="/" >return to homepage</Link> or prefer to redirect to another page</p>
			</div>
		</div>
	); 
} 

export default Error_Server_Page;
