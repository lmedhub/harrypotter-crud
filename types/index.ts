export type CharacterProps = {
    patronus: string;
    ancestry: string;
    alive: boolean;
    dateOfBirth: string;
    actor: string;
    species: string;
    id: string;
    name: string;
    house: string;
    note: string;
    image: string;
  };
  
  export type HouseCount = {
    house: string;
    _count: number;
  }

  export type ChartData = {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  }
