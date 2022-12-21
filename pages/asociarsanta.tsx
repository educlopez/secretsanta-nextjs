import clientPromise from "../lib/mongodb"

export default function Santas({ santas }) {
    return (
        <div>
            <h1>Asociar Santas</h1>
            <form action="/send-data-here" method="post">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Seleccione su nombre
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                    {santas.map((santa) => (
                        <option key={santa.title} value="{santa.title}">{santa.title}</option>
                    ))}
                </select>
            </form>
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