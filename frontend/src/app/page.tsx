export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Hệ Thống Gợi Ý Phim</h1>
        
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nhập User ID để lấy gợi ý:
          </label>
          <div className="flex space-x-4">
            <input 
              type="text" 
              placeholder="Ví dụ: 196" 
              className="flex-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-200">
              Gợi ý
            </button>
          </div>
        </div>

        {/* TODO: Hiển thị kết quả phim ở đây */}
      </div>
    </main>
  );
}
