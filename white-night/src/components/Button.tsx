import './Button.scss';

interface IButton{
    children:string
}

export default function Button(props:IButton) {
    return (<span className='c-button'>
        {props.children}
    </span>)
};
