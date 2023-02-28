import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

const Error_Server_Page = () => {
	
	useEffect(() => {
		document.title = "Internal Server Page";
	},[]);

	return (
		<div id="notfound" >
			<div className="notfound error-server">
				<div className="notfound-404">
					<h1>500</h1>
				</div>
				<h2>Oops! It's look like our server got something wrong !</h2>
				<p>Hmm... dark dark bruh bruh lmao :v our server got crashed. May be you need to contact to our administrator <a href="mailto:kykoyubidevnoreply@gmail.com"  className="link-info" target="_blank"  rel="noreferrer">here</a>. Or <Link to="/" >Return to homepage</Link></p>
			</div>
		</div>
	); 
} 

export default Error_Server_Page;
