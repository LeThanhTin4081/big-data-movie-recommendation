const {MongoClient}=require('mongodb');
const client=new MongoClient('mongodb://tinlt4081_db_user:F7jLtQj7LEfiodaD@ac-aqjl8dd-shard-00-00.clksuuo.mongodb.net:27017,ac-aqjl8dd-shard-00-01.clksuuo.mongodb.net:27017,ac-aqjl8dd-shard-00-02.clksuuo.mongodb.net:27017/movie_recommendation_db?ssl=true&replicaSet=atlas-9tf7zm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
async function run(){
    await client.connect();
    const m = await client.db('movie_recommendation_db').collection('movies').find({ _id: { $in: [50, 258, 100, 181, 294] } }).toArray();
    console.log(m.map(x => x.title + ': ' + x.genres.join(', ')));
    client.close();
}
run();
