import {PureComponent,Fragment} from "react";

export default class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {error: null};
    }

    //此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state
    //getDerivedStateFromError() 会在渲染阶段调用，因此不允许出现副作用。如遇此类情况，请改用 componentDidCatch()。
    static getDerivedStateFromError(error) {
        return {error};
    }

    //error —— 抛出的错误。
    //errorInfo —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。
    //componentDidCatch() 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况：
    componentDidCatch(error, errorInfo) {
        // this.props.setError(error.message);
        // this.setState({error:error.message})
    }

    render() {
        if (this.state.error) return <pre style={{color: 'red', whiteSpace: 'pre-wrap'}}>{this.state.error}</pre>;
        return <Fragment>{this.props.children}</Fragment>;
    }
}

//React 的开发和生产构建版本在 componentDidCatch() 的方式上有轻微差别。
//
// 在开发模式下，错误会冒泡至 window，这意味着任何 window.onerror 或 window.addEventListener('error', callback) 会中断这些已经被 componentDidCatch() 捕获的错误。
//
// 相反，在生产模式下，错误不会冒泡，这意味着任何根错误处理器只会接受那些没有显式地被 componentDidCatch() 捕获的错误。
