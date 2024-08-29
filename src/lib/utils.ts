import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getPokemonIds(): number[] {
    const min = Math.ceil(1);
    const max = Math.floor(151);
    const first = Math.floor(Math.random() * (max - min + 1)) + min;
    let second = Math.floor(Math.random() * (max - min + 1)) + min;
    while (second === first) {
        second = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return [first, second];
}

export function capitalizeString(word: string): string {
    return word[0].toUpperCase() + word.slice(1);
}
