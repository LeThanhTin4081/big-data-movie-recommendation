const {MongoClient}=require('mongodb');
const client=new MongoClient('mongodb://tinlt4081_db_user:F7jLtQj7LEfiodaD@ac-aqjl8dd-shard-00-00.clksuuo.mongodb.net:27017,ac-aqjl8dd-shard-00-01.clksuuo.mongodb.net:27017,ac-aqjl8dd-shard-00-02.clksuuo.mongodb.net:27017/movie_recommendation_db?ssl=true&replicaSet=atlas-9tf7zm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
async function run(){
    await client.connect();
    const movie50 = await client.db('movie_recommendation_db').collection('movies').findOne({title: 'Star Wars (1977)'});
    console.log(typeof movie50._id, movie50._id);
    
    const count = await client.db('movie_recommendation_db').collection('movies').countDocuments({ _id: { $in: [50, 258, 100, 181, 294] } });
    console.log('Integer count:', count);
    
    const countStr = await client.db('movie_recommendation_db').collection('movies').countDocuments({ _id: { $in: ["50", "258", "100", "181", "294"] } });
    console.log('String count:', countStr);
    
    client.close();
}
run();
