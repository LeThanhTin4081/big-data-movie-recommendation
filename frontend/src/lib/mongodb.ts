import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || "";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URI) {
  throw new Error("Vui lòng thêm biến môi trường MONGO_URI vào file .env");
}

if (process.env.NODE_ENV === "development") {
  // Sử dụng biến global để lưu trữ kết nối trong môi trường phát triển (development),
  // tránh việc mở nhiều kết nối trùng lặp khi Next.js reload (hot-reload).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Trong môi trường chạy thực tế (production), không sử dụng biến global.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Hàm kết nối nhanh để lấy database
export async function connectToDatabase() {
  const conn = await clientPromise;
  const db = conn.db(process.env.MONGO_DB_NAME || "movie_recommendation_db");
  return { client: conn, db };
}

export default clientPromise;
