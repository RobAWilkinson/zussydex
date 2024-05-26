type AbilityDetails = {
    name: string;
    url: string;
};

type Ability = {
    ability: AbilityDetails;
    is_hidden: boolean;
    slot: number;
};

type CryUrls = {
    latest: string;
    legacy: string;
};

type FormDetails = {
    name: string;
    url: string;
};

type Forms = FormDetails[];

type VersionDetails = {
    name: string;
    url: string;
};

type GameIndex = {
    game_index: number;
    version: VersionDetails;
};

type GameIndices = GameIndex[];

type MoveLearnMethod = {
    name: string;
    url: string;
};

type VersionGroup = {
    name: string;
    url: string;
};

type VersionGroupDetail = {
    level_learned_at: number;
    move_learn_method: MoveLearnMethod;
    version_group: VersionGroup;
};

type MoveDetails = {
    name: string;
    url: string;
};

type Move = {
    move: MoveDetails;
    version_group_details: VersionGroupDetail[];
};

type Moves = Move[];

type Species = {
    name: string;
    url: string;
};

type SpriteSet = {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
};

type OtherSprites = {
    dream_world: {
        front_default: string | null;
        front_female: string | null;
    };
    home: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
    };
    "official-artwork": {
        front_default: string;
        front_shiny: string;
    };
    showdown: SpriteSet;
};

type Sprites = SpriteSet & {
    other: OtherSprites;
};

type StatDetails = {
    name: string;
    url: string;
};

type Stat = {
    base_stat: number;
    effort: number;
    stat: StatDetails;
};

type Stats = Stat[];


type TypeDetails = {
    name: string;
    url: string;
};
type PokemonType = {
    slot: number;
    type: TypeDetails;
};


type Types = PokemonType[];
export type Pokemon = Partial<{
    types: Types;
    abilities: AbilityDetails[];
    base_experience: number;
    cries: CryUrls[];
    forms: FormDetails[];
    game_indices: GameIndices[];
    height: number;
    held_items: [];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: MoveDetails[];
    name: string;
    order: number;
    past_abilities: AbilityDetails[];
    species: Species;
    sprites: Sprites;
    stats: Stats;
}> & { name: string; url: string }
