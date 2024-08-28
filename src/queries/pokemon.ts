import { useQuery } from '@tanstack/react-query';

export function usePokemonQuery(id: number) {
    return useQuery({
        queryKey: ['pokemon', id],
        queryFn: () => getPokemon(id),
    });
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
