import React from 'react';
import './Journey.css';
import UpdateIcon from './../../../../../icons/update-blue-icon.png';
import CancelIcon from './../../../../../icons/cancel-dark-icon.png';
							
const Journey = ({ journey, onJourneyValueUpdate, onEditing, editJourneyName, deleteJourney, isEditing, onJourneyChange }) => {
	const handleJourneyValueChange = (event) => {
		onJourneyValueUpdate(event.target.value);
	};

	const handleJourneyValueConfirm = (event) => {
		if (event.keyCode === 13) {
			onEditing('');
			editJourneyName(journey.id);
		}
	};

	const handleUpdate = (target) => {
		onEditing(target);
	};

	const handleDelete = (delJourneyId) => {
		deleteJourney(delJourneyId);
	};

	return(
		<li className='journey' id={journey.id}>
			{isEditing === journey.id
				? <input
						id='update-journey-input'
						className='update-journey-input' 
						type='text' 
						placeholder={journey.name}
						onChange={handleJourneyValueChange}
						onKeyDown={handleJourneyValueConfirm}
					/>
				: <button 
						className='change-display-journey-btn' 
						onClick={() => onJourneyChange(journey.id)}
					>
						<span className='journey-name'>{journey.name}</span>
					</button>
			}
			<div className='journey-btn-group'>
			{	isEditing === journey.id
				?	<button
            className='cancel-btn' 
            onClick={() => handleUpdate('')}
          >
            <img className='cancel-btn-img' alt='cancel' src={CancelIcon}/>
          </button>
				:	<button
						className='update-btn'
						onClick={() => handleUpdate(journey.id)}
					>
						<img className='update-icon-img' alt='update-icon' src={UpdateIcon}/>
					</button>
      }
				<button 
					className='delete-btn'
					onClick={() => { 
						if(window.confirm('Are you sure you wish to delete this Journey?'))
							handleDelete(journey.id) 
					}}
				><span>刪除</span></button>
			</div>
		</li>
	)
}

export default Journey;
