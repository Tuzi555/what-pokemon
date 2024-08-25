import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { useState } from 'react';
import { Skeleton } from './components/ui/skeleton';

function getPokemonIds(): number[] {
    const min = Math.ceil(1);
    const max = Math.floor(152);
    const first = Math.floor(Math.random() * (max - min + 1)) + min;
    let second = Math.floor(Math.random() * (max - min + 1)) + min;
    while (second === first) {
        second = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return [first, second];
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

function Pokemon({ imgUrl }: { imgUrl: string }) {
    return (
        <Card className="bg-card hover:bg-primary">
            <CardContent>
                <img className="w-52 h-52" src={imgUrl} />
            </CardContent>
        </Card>
    );
}

function PokemonSkeleton() {
    return (
        <Card className="bg-card hover:bg-primary">
            <CardContent>
                <div className="w-52 h-52" />
            </CardContent>
        </Card>
    );
}

function App() {
    const [pokemonIds, _] = useState(getPokemonIds);
    const queryOne = useQuery({
        queryKey: ['pokemon', pokemonIds[0]],
        queryFn: () => getPokemon(pokemonIds[0]),
    });
    const queryTwo = useQuery({
        queryKey: ['pokemon', pokemonIds[1]],
        queryFn: () => getPokemon(pokemonIds[1]),
    });

    return (
        <>
            <div className="w-full flex flex-row justify-center p-8 border-b-primary border bg-accent">
                <h1 className="text-4xl font-bold">What Pokemon?</h1>
            </div>
            <div className="w-full flex flex-col items-center h-full mt-12">
                <div className="flex justify-center bg-secondary rounded-md p-12 gap-12">
                    {queryOne.isSuccess && queryTwo.isSuccess ? (
                        <>
                            <Pokemon
                                imgUrl={queryOne.data.sprites.front_default}
                            />
                            <Pokemon
                                imgUrl={queryTwo.data.sprites.front_default}
                            />
                        </>
                    ) : (
                        <>
                            <PokemonSkeleton />
                            <PokemonSkeleton />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
