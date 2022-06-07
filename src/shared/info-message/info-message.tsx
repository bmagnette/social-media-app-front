import './info-message.scss';
import React from 'react';

const messageType = (tokenDaysLeft) => {
    if(tokenDaysLeft <= 0){
        return `You need to synchronize your account.`
    }
    else if(tokenDaysLeft >= 0 && tokenDaysLeft <= 1.5){
        return `Token expire in ${parseInt(tokenDaysLeft)} day.`
    }
    else{
        return `Token expire in ${parseInt(tokenDaysLeft)} days.`
    }
};
export const InfoMessage = (props) => {
    return <div className={`info-${props.type}-message`}>
        <h3>{props.description}</h3>
        <ul>
            {props.list.map(element => {
                return <li key={element.id}>{element.name} - {messageType(element.day_before_expiration)}</li>;
            })}
        </ul>
    </div>;
};


// type : warning, info, error.
