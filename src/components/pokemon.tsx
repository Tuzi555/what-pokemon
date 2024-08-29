import { ReactNode } from 'react';
import { Card, CardContent } from './ui/card';

export function Pokemon({ imgUrl }: { imgUrl: string }) {
    return (
        <PokemonCard>
            <img className="w-52 h-52" src={imgUrl} />
        </PokemonCard>
    );
}

export function PokemonSkeleton() {
    return (
        <PokemonCard>
            <div className="w-52 h-52" />
        </PokemonCard>
    );
}

function PokemonCard({ children }: { children: ReactNode }) {
    return (
        <Card className="bg-card hover:bg-primary">
            <CardContent>{children}</CardContent>
        </Card>
    );
}
