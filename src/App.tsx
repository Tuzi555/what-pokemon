import { useState } from 'react';
import { Pokemon, PokemonSkeleton } from './components/pokemon';
import { usePokemonQuery } from './queries/pokemon';

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

function App() {
    const [pokemonIds, _] = useState(getPokemonIds);
    const queryOne = usePokemonQuery(pokemonIds[0]);
    const queryTwo = usePokemonQuery(pokemonIds[1]);

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
