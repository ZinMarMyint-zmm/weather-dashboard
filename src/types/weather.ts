
export type OptionType = {
    name: string,
    lat: number,
    lon: number,
}

// export type ForecastType = {

// }
export type WeatherType ={
    main: {
        temp: number;
        humidity: number;
    }
    weather: 
        {
        description: string;
        icon: string;
        }[]
    
    wind: {
        speed: number;
    }
    
}
export type ForecastType ={
    name: string
    country: string
    list: {
        dt: number,
        main: {
            feels_like: number,
            humidity: number,
            pressure: number,
            temp: number,
        },
        weather: 
            {
            main: string,
            icon: string,
            description:string
            }[]
        
        wind: {
            speed: number,
            gust: number,
            deg:number
        }
        clouds: {
            all:number
        }
        pop: number
        visibility:number
    }[]
    
    
}

export interface LoadingSpinnerType {
  size?: "sm" | "md" | "lg";
  color?: string;
  message?: string;
}