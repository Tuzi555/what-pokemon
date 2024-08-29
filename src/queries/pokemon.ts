import { Pokemon } from '@/schemas/pokemon';
import { useQuery } from '@tanstack/react-query';

export function usePokemonQuery(id: number) {
    return useQuery({
        queryKey: ['pokemon', id],
        queryFn: () => getPokemon(id),
    });
}
async function getPokemon(id: number): Promise<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    return Pokemon.parse(await response.json());
}
