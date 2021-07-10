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

function createCharacter():ICharacterInfo{
    return {
        name:"abc",
        power:_.random(100),
        speed:_.random(100),
        defense:_.random(100),
        lucky:_.random(100),
        technology:_.random(100),
        endurance:10
    }
}
