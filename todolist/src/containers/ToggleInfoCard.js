import { connect } from 'react-redux';
import {updateComicSentenceCreator, updateIdCreator} from "../actions";
import Card from "../components/Card";

const mapStateToProps = (state) => {
    return {
        info:state.id%2 ? '普通用户' : '管理员',
        id:state.id,
        comicSentence:state.comicSentence
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick:(id)=>{
            dispatch(updateIdCreator(id+1))
        },
        updateComicSentence:()=>dispatch(updateComicSentenceCreator())
    }
}

const ToggleInfoCard = connect(mapStateToProps,mapDispatchToProps)(Card);
export default ToggleInfoCard;
