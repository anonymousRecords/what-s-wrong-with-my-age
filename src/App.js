import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from "styled-components";

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: '20rem',
    height: '10rem',
    position: 'fixed',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '0.286em',
    border: '2px solid #9de5d2',
    transform: 'translate(-50%, -50%)',
    padding: '3rem',
    textAlign: 'center',
    backgroundColor: 'white',
    fontSize: '0.8rem',
  },
};

const AgeCalculatorWrapper = styled.div`
  width: 375px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 1.8rem;
  background-color: white;

  h1 {
    font-size: 30px;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 3rem;
  }

  img {
    border-radius: 0.286em;
    margin-bottom: 3rem;
  }

  input-container {
    display: flex;
    flex-wrap: wrap;
    gap: 100px;
    margin-bottom: 0.5rem;
  }

  input { 
    width: 6rem;
    height: 3rem;
    border-radius: 0.286em;
    border: 1px solid black;
    padding: 1rem;
    margin: 0 0.3rem;
  }

  input:hover {
    border: 1px solid #9de5d2;
  }

  .btn {
    background-color: #9de5d2;
    width: 100%;
    height: 3rem;
    font-size: 0.875rem;
    font-weight: 700;
    text-align: center;
    color: white;
    border-radius: 0.286em;
    cursor: pointer;
  }

  .desc{
    font-size: 0.1px;
    margin-top: 0.3rem;
    margin-bottom: 2rem;
    text-align: start;
  }

  .modal-btn{
    background-color: #9de5d2;
  }
  
  .result{
    width: 100%;
    height: 3rem;
    text-align: center;
  }
`;

function AgeCalculator() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [age, setAge] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  // input 유효성 검사
  const handleYearChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,4}$/.test(input)) {
      setYear(input);
    }
  };

  const handleMonthChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,2}$/.test(input)) {
      setMonth(input);
    }
  };

  const handleDayChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,2}$/.test(input)) {
      setDay(input);
    }
  };

  // 모달창 관리
  const openModal = (message) => {
    setModalMessage(message);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  // 만 나이 계산
  const calculateAge = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    if (year.length !== 4 || month.length !== 2 || day.length !== 2) {
      openModal('올바른 날짜 형식을 입력해주세요.');
      return;
    }

    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);

    if (yearNum > currentYear || yearNum < 1900 || monthNum > 12 || monthNum < 1 || dayNum > 31 || dayNum < 1) {
      openModal('올바른 날짜를 입력해주세요.');
      return;
    }

    let calculatedAge = currentYear - yearNum;

    if (currentMonth < monthNum || (currentMonth === monthNum && currentDay < dayNum)) {
      calculatedAge--;
    }

    setAge(calculatedAge);
  };

  return (
    <AgeCalculatorWrapper>
      <h1>내 나이가 어때서</h1>
      <p>당신의 만 나이를 계산해 드릴게요</p>
      <img src='/assets/main-img.svg' alt='main-img'/>
      <div className='input-container'>
          <input type="text" value={year} onChange={handleYearChange} placeholder='년도' />
          <input type="text" value={month} onChange={handleMonthChange} placeholder='월' />
          <input type="text" value={day} onChange={handleDayChange} placeholder='일' />
      </div>
      <br />
      <button className='btn' onClick={calculateAge}>만 나이 계산하기</button>
      <div className='desc'>월, 일을 정확하게 입력해주세요. (예시: 09월 02일)</div>
      <div className='result'>
        {age !== null && <p>당신은 {age}세입니다.</p>}
      </div>

      <Modal style={customStyles} className="modal-page" isOpen={modalIsOpen} onRequestClose={closeModal}>
        <button onClick={closeModal}>X</button>
        <br/><br/>
        <p>{modalMessage}</p>
      </Modal>
    </AgeCalculatorWrapper>
  );
}

export default AgeCalculator;
