import React from "react";
import "./details.css";

export default function ProfileCard({data}) {
	const avatarHandler=(avatar)=>{
		if(!avatar){
			// return the default avatar
			return "https://icons.iconarchive.com/icons/mahm0udwally/all-flat/128/User-icon.png"; 
		}
		if(avatar.startsWith("http")){
			return avatar
		}else{
			return `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}`
		}
	}
	return (
		<div className="card-container">
			<header>
                <img src={avatarHandler(data.avatar)} alt="profile" className="profile-img" />
			</header>
			<h1 className="bold-text">
				{data.name} 
			</h1>
			
			<div className="social-container">
				<div className="followers">
					<h2 className="smaller-text">{data.role}</h2>
				</div>
            </div> 
		</div>
	);
}



