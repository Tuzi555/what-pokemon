import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from './components/ui/card';

function getRandomInt() {
    const min = Math.ceil(1);
    const max = Math.floor(152);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getPokemon(id: number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
        else {
            console.error('Caught variable was not an instance of Error');
        }
    }
}

function Pokemon({ query }) {
    if (!query.isSuccess) return;
    return (
        <Card className="bg-card hover:bg-primary">
            <CardContent>
                <img
                    className="w-52 h-52"
                    src={query.data.sprites.front_default}
                />
            </CardContent>
        </Card>
    );
}

function App() {
    const one = getRandomInt();
    const queryOne = useQuery({
        queryKey: ['pokemon', one],
        queryFn: () => getPokemon(one),
    });
    const two = getRandomInt();
    const queryTwo = useQuery({
        queryKey: ['pokemon', two],
        queryFn: () => getPokemon(two),
    });
    return (
        <>
            <div className="w-full flex flex-row justify-center p-8 border-b-primary border bg-accent">
                <h1 className="text-4xl font-bold">What Pokemon?</h1>
            </div>
            <div className="w-full flex flex-col items-center h-full mt-12">
                <div className="flex justify-center bg-secondary rounded-md p-12 gap-12">
                    <Pokemon query={queryOne} />
                    <Pokemon query={queryTwo} />
                </div>
            </div>
        </>
    );
}

export default App;
