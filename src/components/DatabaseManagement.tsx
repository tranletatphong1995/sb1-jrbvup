import React, { useState } from 'react';

const DatabaseManagement: React.FC = () => {
  const [divinationRecords, setDivinationRecords] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          const data = JSON.parse(content);
          setDivinationRecords(data);
        } catch (error) {
          console.error('Lỗi khi phân tích JSON:', error);
          alert('File JSON không hợp lệ');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(divinationRecords, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'ket_qua_luc_hao.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Quản lý dữ liệu</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Nhập dữ liệu</h3>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Xuất dữ liệu</h3>
        <button
          onClick={handleExportData}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Xuất JSON
        </button>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Danh sách kết quả Lục Hào</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Ngày</th>
              <th className="border p-2">Thời gian</th>
              <th className="border p-2">Giới tính</th>
              <th className="border p-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {divinationRecords.map((record, index) => (
              <tr key={index}>
                <td className="border p-2">{record.date}</td>
                <td className="border p-2">{record.time}</td>
                <td className="border p-2">{record.gender === 'male' ? 'Nam' : 'Nữ'}</td>
                <td className="border p-2">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Sửa</button>
                  <button className="text-red-600 hover:text-red-800">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatabaseManagement;