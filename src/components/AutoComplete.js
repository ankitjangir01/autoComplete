import React, { useState } from 'react';
import { users } from '../data/users';
import './../styles/autocomplete.css';
import avatar from './../assets/beautiful-woman-avatar-character-icon-free-vector.jpg';

const AutoComplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState(users);
  const [selectedChipOnBackspaceClick, setSelectedChipOnBackspaceClick] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
      setInputValue('');
    }
  };

  const handleDeleteChip = (nameInChipToDelete) => {
    setSelectedOptions((chips) => chips.filter((chip) => chip.name.toLowerCase() !== nameInChipToDelete.toLowerCase()));
  };

  const handleBackspaceClick = (event) => {
    if (event.key === 'Backspace' && event.target.value === "") {
      if(!selectedChipOnBackspaceClick){
        setSelectedChipOnBackspaceClick(selectedOptions[selectedOptions.length - 1]);
      }
      else{
        const newArr = selectedOptions;
        newArr.pop();
        setSelectedOptions(newArr);
        setSelectedChipOnBackspaceClick(null)
      }
    }
  };


  return (
    <div className="autocomplete-container">
      <div className="autocomplete-gutter">
        {selectedOptions.map((option) => (
          <span key={option.name.toLowerCase()} className="chip" style={selectedChipOnBackspaceClick?.name.toLowerCase() === option.name.toLowerCase() ? {outline: 'solid #1b96ff 2px'} : {}}>
            <img src={avatar} className='avatar' />
            {option.name}
            <span className="chip-close" onClick={() => handleDeleteChip(option.name)} style={{fontSize: '1.2em'}}>&times;</span>
          </span>
        ))}
        < input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to search..."
          className="autocomplete-input"
          onKeyDown={handleBackspaceClick}
        />
      </div>
      {inputValue && (
        <div className="dropdown">
          {options
            .filter((option) => option?.name?.toLowerCase().includes(inputValue.toLowerCase()))
            .filter((option) => !selectedOptions.some(opt => opt.name.toLowerCase() === option.name.toLowerCase()))
            .map((filteredOption) => (
              <div
                key={filteredOption.name}
                className="option"
                onClick={() => handleOptionClick(filteredOption)}
              >
                <img className='avatar' src={avatar} alt="avatar" />
                {filteredOption.name}
                <p style={{marginLeft: '8px', color: '#a0a0a0'}}>{filteredOption.email}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
