import Button from "../components/Button";
import {useHistory} from "react-router-dom";
import {Path} from "./constant";

export default function Home(){
    const history = useHistory();

    return <>
        <Button onClick={()=>history.push(Path.CreateCharacter)}>Button</Button>
    </>;
}
