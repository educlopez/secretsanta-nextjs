import clientPromise from '../../lib/mongodb'

export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db('secretsanta')
    const { santa, email, isAssigned, elfo } = req.body

    const post = await db.collection('santas').insertOne({
      santa,
      email,
      isAssigned,
      elfo,
    })

    res.json(post)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
