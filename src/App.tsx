import './App.css';
import { useQuery } from '@tanstack/react-query';
import { ModeToggle } from './components/mode-toggle';

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
    return <img className="w-48 h-48" src={query.data.sprites.front_default} />;
}

function App() {
    return (
        <>
            <div className="w-full flex flex-row justify-between">
                <div />
                <ModeToggle />
            </div>
            <div className="flex flex-col justify-center w-full">
                <Pikachu />
            </div>
        </>
    );
}

export default App;
