import { useState } from 'react';
import { Pokemon, PokemonSkeleton } from './components/pokemon';
import { usePokemonQuery } from './queries/pokemon';
import { capitalizeString, getPokemonIds } from './lib/utils';
import { toast } from 'sonner';

function App() {
    const [pokemonIds, setPokemonIds] = useState(getPokemonIds);
    const [streak, setStreak] = useState(0);
    const queryOne = usePokemonQuery(pokemonIds[0]);
    const queryTwo = usePokemonQuery(pokemonIds[1]);
    const firstOneIsTheOne = Math.round(Math.random()) === 0;

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setStreak((value) => {
                return value + 1;
            });
            toast.success(
                <div className="flex flex-row justify-center w-full">
                    <h1 className="text-center text-2xl">
                        🎉 That is correct!
                    </h1>
                </div>
            );
        } else {
            setStreak(0);
            toast.error(
                <div className="flex flex-row justify-center w-full">
                    <h1 className="text-center text-2xl">
                        🫣 That is incorrect, try again!
                    </h1>
                </div>
            );
        }

        setPokemonIds(getPokemonIds);
    };

    return (
        <>
            <div className="w-full flex flex-row justify-center p-8 border-b-primary border bg-accent">
                {queryOne.isSuccess && queryTwo.isSuccess ? (
                    <h1 className="text-4xl font-bold">
                        Which one is{' '}
                        {capitalizeString(
                            firstOneIsTheOne
                                ? queryOne.data.name
                                : queryTwo.data.name
                        )}
                        ?
                    </h1>
                ) : (
                    <h1 className="text-4xl font-bold">
                        Which one is _______?
                    </h1>
                )}
            </div>
            <div className="w-full flex flex-col items-center h-full mt-12">
                <div className="flex justify-center bg-secondary rounded-md p-12 gap-12">
                    {queryOne.isSuccess && queryTwo.isSuccess ? (
                        <>
                            <button
                                onClick={() => handleAnswer(firstOneIsTheOne)}
                            >
                                <Pokemon
                                    imgUrl={queryOne.data.sprites.front_default}
                                />
                            </button>
                            <button
                                onClick={() => handleAnswer(!firstOneIsTheOne)}
                            >
                                <Pokemon
                                    imgUrl={queryTwo.data.sprites.front_default}
                                />
                            </button>
                        </>
                    ) : (
                        <>
                            <PokemonSkeleton />
                            <PokemonSkeleton />
                        </>
                    )}
                </div>
                <div className="pt-4">
                    <h2>Your current streak is: {streak}</h2>
                </div>
            </div>
        </>
    );
}

export default App;
