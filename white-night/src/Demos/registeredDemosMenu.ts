interface IEvent{
    ctrlKey:boolean,
    key:string
}

function openDemosMenu(e:IEvent){
    if(e.ctrlKey && e.key === 'm'){
        console.log('触发OpenDemosMenu')
    }
}

export function registeredDemosMenu(){
    document.addEventListener('keydown',openDemosMenu);
}

export function unRegisteredDemosMenu(){
    document.removeEventListener('keydown',openDemosMenu);
}
