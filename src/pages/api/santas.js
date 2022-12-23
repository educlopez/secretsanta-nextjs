import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("secretsanta");

       const santas = await db
           .collection("santas")
           .find({})
           .toArray();

       res.json(santas);
   } catch (e) {
       console.error(e);
   }
};