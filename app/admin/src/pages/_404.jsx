import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

const Not_Found_Page = () => {
	
	useEffect(() => {
		document.title = "Not Found Page"
	},[]);

	return (
		<div id="notfound">
			<div className="notfound">
				<div className="notfound-404">
					<h1>404</h1>
				</div>
				<h2>Oops! It's look like you're going to no where !</h2>
				<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <Link to="/">Return to homepage</Link></p>
			</div>
		</div>
	); 
} 

export default Not_Found_Page;
