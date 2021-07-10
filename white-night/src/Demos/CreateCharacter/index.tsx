import Button from "../../components/Button";
import styles from "./index.module.scss";
import {useCallback, useState} from "react";
import {ICharacterInfo} from "../../components/CharacterInfo";
import _ from 'lodash';
import Card from "./Card";

export default function CreateCharacter(){
    const {character,randomCreate} = useRandomCreateCharacter();
    return <div className={styles.view}>
        <Button onClick={randomCreate}>生成人物</Button>
        <Card data={character}/>
    </div>
}

function useRandomCreateCharacter(){
    const [character,setCharacter] = useState<ICharacterInfo>(createCharacter());

    const randomCreate:()=>void = useCallback(()=>{
        setCharacter(createCharacter());
    },[])


    return {character,randomCreate};
}

function createCharacter(max=120):ICharacterInfo{
    const numbers = randomDistribution(6,max)
    return {
        name:"温雪",
        power:numbers[0],
        speed:numbers[1],
        defense:numbers[2],
        lucky:numbers[3],
        technology:numbers[4],
        hp:numbers[5] * 2,
        endurance:10
    }
}

//随机分配数值
function randomDistribution(count:number,max:number){
    return create();

    function create(){
        const result:Array<number> = _.times(count,()=>0);

        _.forEach(Array(max),()=>{
            const r = _.random(0,count-1);
            result[r]++;
        })

        return result;
    }
}
