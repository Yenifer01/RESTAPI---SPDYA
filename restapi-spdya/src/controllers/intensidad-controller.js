import {getConnection} from "./../database/database";

const getIntensidad = async (req,res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * from intensidad");
        res.json(result);

    }catch(error){
        res.status(500);
        res.send(error.message)
    }
}
export const methods ={
    getIntensidad,
}