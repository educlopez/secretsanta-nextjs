import clientPromise from '../../lib/mongodb'

export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db('secretsanta')

    const collection = db.collection('santas')
    collection.deleteMany({}, (err, result) => {
      if (err) {
        console.error(err)
        res
          .status(500)
          .send({ error: 'Error deleting documents from the collection' })
        return
      }
      console.log(
        `Deleted ${result.deletedCount} documents from the collection.`
      )
      res.json({
        message: `Deleted ${result.deletedCount} documents from the collection.`,
      })
    })
  } catch (e) {
    console.error(e)
    res
      .status(500)
      .send({ error: 'Error deleting documents from the collection' })
  }
}
