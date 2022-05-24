export interface Users{
    id:string,
    name: string,
    mail:string,
    phone:any,
    profileImg:any
} 
export interface Ofertas{
    id:string,
    title:string,
    category:string,
    price:any,
    listImg: Array<any>,
    location:any,
    description:string,
    views:number,
    created_at:any,
    reports:number,
    created_by:any,
    isFav:boolean,
}

export interface Category{
    id:string; 
    title:string;
    img: string;
}

export interface SesionChat{
    id:string,
    img:any,
    title:string,
    userGuest:Users,
    userCreator:Users
    lastMsg:{
        text: string,
        created_at:any
    }
}

export interface Chat{
    id:string,
    created_at:any,
    listMsg: [Msg]
}
export interface Msg{
    id:string,
    text:string
    sendByGuest:boolean,
    created_at:any
}

