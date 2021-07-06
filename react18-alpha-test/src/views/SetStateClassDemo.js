import React from 'react';

let count = 0;

export default class SetStateClassDemo extends React.PureComponent{
    constructor() {
        super();
        this.state = {value:0}
    }

    componentDidMount(){
        this.setState({value:this.state.value+1});
        console.log(this.state.value);
        this.setState({value:this.state.value+1});
        console.log(this.state.value);

        setTimeout(()=>{
            this.setState({value:this.state.value+1});
            console.log(this.state.value);
            this.setState({value:this.state.value+1});
            console.log(this.state.value);
        },3000)
    }

    render(){
        console.log('count',++count);
        return <div>
            Demo
        </div>
    }
}
