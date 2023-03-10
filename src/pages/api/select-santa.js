import clientPromise from '../../lib/mongodb'

export default async function selectSanta(req, res) {
  try {
    const client = await clientPromise
    const db = client.db('secretsanta')
    const { selectedSanta } = req.body

    // Obtener santas disponibles para asignar como elfo
    const availableElves = await db
      .collection('santas')
      .find({ isAssigned: false })
      .toArray()
    if (availableElves.length === 0) {
      return res
        .status(400)
        .json({ error: 'No hay santas disponibles para asignar como elfo' })
    }

    // Generar número aleatorio entre 0 y el número de santas disponibles
    const randomIndex = Math.floor(Math.random() * availableElves.length)

    // Asignar elfo del santa en la posición del número aleatorio generado al santa seleccionado
    const selectedElf = availableElves[randomIndex]
    await db
      .collection('santas')
      .updateOne(
        { santa: selectedSanta },
        { $set: { elfo: selectedElf.santa } }
      )
    await db
      .collection('santas')
      .updateOne({ santa: selectedElf.santa }, { $set: { isAssigned: true } })

    res.status(200).json({
      message: 'Elfo asignado exitosamente',
      selectedElf: selectedElf.santa,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Hubo un problema al asignar el elfo' })
  }
}
