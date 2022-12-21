import clientPromise from "../lib/mongodb"

export default function Santas({ santas }) {
    return (
            <div>
                <h1>Listado de Santas</h1>
                <ul>
                    {santas.map((santa) => (
                        <li key={santa.title}>
                            <p>{santa.title}</p>
                            <p>{santa.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("secretsanta");

        const santas = await db
            .collection("santas")
            .find({})
            .toArray();

        return {
            props: { santas: JSON.parse(JSON.stringify(santas)) },
        };
    } catch (e) {
        console.error(e);
    }
}