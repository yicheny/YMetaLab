import './Button.scss';

interface IButton{
    children:string,
    onClick?:()=>any;
}

export default function Button(props:IButton) {
    return (<span className='c-button' onClick={props.onClick}>
        {props.children}
    </span>)
};
