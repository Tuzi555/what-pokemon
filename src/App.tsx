import { useQuery } from '@tanstack/react-query';
import { ModeToggle } from './components/mode-toggle';
import { Card, CardContent } from './components/ui/card';

async function getPikachu() {
    const url = 'https://pokeapi.co/api/v2/pokemon/25';
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

function Pikachu() {
    const query = useQuery({ queryKey: ['pikachu'], queryFn: getPikachu });

    if (!query.isSuccess) return;
    return (
        <Card>
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
    return (
        <>
            <div className="w-full flex flex-row justify-between p-8">
                <ModeToggle />
                <div>
                    <h1 className="text-3xl font-bold">Guess that Pokemon!</h1>
                </div>
                <ModeToggle />
            </div>
            <div className="flex justify-center w-full gap-5">
                <Pikachu />
                <Pikachu />
                <Pikachu />
            </div>
        </>
    );
}

export default App;
