import React, { useState } from 'react';
import { solarToLunar, calculateCanChi } from '../utils/lunarCalculations';
import DivinationResult from './DivinationResult';

const DivinationForm: React.FC = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [gender, setGender] = useState('');
  const [hexagramLines, setHexagramLines] = useState(['', '', '', '', '', '']);
  const [movingLine, setMovingLine] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [divinationData, setDivinationData] = useState(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lunarDate = solarToLunar(date);
    const canChi = calculateCanChi(date, time);
    const newDivinationData = {
      date,
      time,
      gender,
      hexagramLines,
      movingLine,
      lunarDate,
      canChi,
    };
    setDivinationData(newDivinationData);
    setShowResult(true);
  };

  const handleLineClick = (index: number) => {
    const newHexagramLines = [...hexagramLines];
    if (newHexagramLines[index] === '') {
      newHexagramLines[index] = 'yang';
    } else if (newHexagramLines[index] === 'yang') {
      newHexagramLines[index] = 'yin';
    } else {
      newHexagramLines[index] = '';
    }
    setHexagramLines(newHexagramLines);
  };

  const handleMovingLineClick = (index: number) => {
    setMovingLine(movingLine === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Biểu mẫu Lục Hào</h2>
        <div className="mb-4">
          <label htmlFor="date" className="block mb-1">Ngày:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block mb-1">Thời gian:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Giới tính:</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="male"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
                required
                className="mr-1"
              />
              Nam
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="female"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
                required
                className="mr-1"
              />
              Nữ
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Các hào:</label>
          <div className="flex flex-col items-center">
            {hexagramLines.map((line, index) => (
              <div key={index} className="flex items-center mb-2">
                <div
                  onClick={() => handleLineClick(index)}
                  className={`w-32 h-6 border border-gray-300 cursor-pointer ${
                    line === 'yang' ? 'bg-black' : line === 'yin' ? 'flex justify-between' : 'bg-white'
                  }`}
                >
                  {line === 'yin' && (
                    <>
                      <div className="w-14 h-full bg-black"></div>
                      <div className="w-14 h-full bg-black"></div>
                    </>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={movingLine === index}
                  onChange={() => handleMovingLineClick(index)}
                  className="ml-2"
                />
                <span className="ml-1">Hào động</span>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
          Xem kết quả
        </button>
      </form>
      {showResult && divinationData && <DivinationResult divinationData={divinationData} />}
    </div>
  );
};

export default DivinationForm;