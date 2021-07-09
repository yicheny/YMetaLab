import {ICharacterInfo} from "../components/CharacterInfo";

type Nullable<T> = T | null;

interface ISaveData{
    user:string,
    characters:Array<ICharacterInfo>
}

export default class SaveData{
    private static getSaveToken(index:number):string{
        return `wn-save-data${index}`;
    }

    public static checkIndex(index:number){
        if(index<1) throw new Error("存档编号不能小于1！");
        if(index>10) throw new Error("存档编号不能大于10！")
    }

    public get data(){
        return this._data;
    }

    private _data:Nullable<ISaveData> = null;

    public save(data:ISaveData,index:number):Nullable<ISaveData>{
        SaveData.checkIndex(index);
        this._data = data;
        localStorage.setItem(SaveData.getSaveToken(index),JSON.stringify(data));
        return this._data;
    }

    public load(index:number):Nullable<ISaveData>{
        SaveData.checkIndex(index);
        const localData:Nullable<string> = localStorage.getItem(SaveData.getSaveToken(index));
        if(localData===null) return this._data = null;
        return this._data = JSON.parse(localData);
    }
}
