import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


async function storeData(data){
    try {

        await db.update(({ posts }) => posts.push(data))
        
    } catch (error) {
        console.log(error);   
    }
}
