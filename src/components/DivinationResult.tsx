import React from 'react';

interface DivinationResultProps {
  divinationData: any;
}

const DivinationResult: React.FC<DivinationResultProps> = ({ divinationData }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Kết quả Lục Hào</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Thông tin đầu vào:</h3>
          <p>Ngày: {divinationData.date}</p>
          <p>Thời gian: {divinationData.time}</p>
          <p>Giới tính: {divinationData.gender === 'male' ? 'Nam' : 'Nữ'}</p>
          <p>Ngày âm lịch: {divinationData.lunarDate}</p>
        </div>
        <div>
          <h3 className="font-semibold">Thông tin Can Chi:</h3>
          <p>Năm: {divinationData.canChi.year}</p>
          <p>Tháng: {divinationData.canChi.month}</p>
          <p>Ngày: {divinationData.canChi.day}</p>
          <p>Giờ: {divinationData.canChi.hour}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Quẻ:</h3>
        <div className="flex flex-col items-center">
          {divinationData.hexagramLines.map((line: string, index: number) => (
            <div key={index} className="flex items-center mb-2">
              <div className={`w-32 h-6 ${line === 'yang' ? 'bg-black' : 'flex justify-between'}`}>
                {line === 'yin' && (
                  <>
                    <div className="w-14 h-full bg-black"></div>
                    <div className="w-14 h-full bg-black"></div>
                  </>
                )}
              </div>
              {divinationData.movingLine === index && (
                <span className="ml-2 text-red-500">Hào động</span>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Thêm thông tin kết quả Lục Hào khác ở đây */}
    </div>
  );
};

export default DivinationResult;