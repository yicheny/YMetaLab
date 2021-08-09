import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import './Select.scss'

export default function Select({ options, style, className, onChange, defaultValue }) {
    const [searchText, setSearchText] = useState('');
    const [selected, setSelected] = useState(defaultValue);
    const [unfold, setUnfold] = useState(false);
    const containerRef = useRef();

    const selectText = useMemo(() => {
        const item = options.find(x => x.value === selected);
        if (item) return item.text;
    }, [options, selected])

    const renderOptions = useMemo(() => {
        // return options;
        if (['', null, undefined].includes(searchText)) return options;
        const ss = searchText.toLowerCase();
        return options.filter(x => {
            return x.text.toLowerCase().includes(ss)
        });
    }, [options, searchText]);

    const close = useCallback(()=>{
        setUnfold(false);
        setSearchText('');
    },[])

    const open = useCallback(()=>{
        setUnfold(true);
    },[])

    useOnClickOutside(containerRef,close);

    return <div className={ clsx('doc-select', { unfold }, className) }
                ref={ containerRef }
                style={ style }
                onFocus={open}
                onChange={ e => {
                    setSearchText(e.target.value);
                } }>
        <input className="doc-select-input" value={ unfold ? searchText : selectText }
               onChange={(e)=>{
                   if(unfold) setSearchText(e.target.value);
               }}/>
        <div className="doc-select-box">
            {
                renderOptions.map(x => {
                    return <div key={ x.value }
                                className={clsx("doc-select-item",{selected:x.value === selected})}
                                onClick={ () => {
                                    setSelected(x.value);
                                    onChange && onChange(x.value)
                                    close();
                                } }>
                        { x.text }
                    </div>
                })
            }
        </div>
    </div>
};
Select.defaultProps = {
    options: [],
}

export function useOnClickOutside(ref, handler) {
    useEffect(() => {
            const listener = event => {
                if (!ref.current || ref.current.contains(event.target)) return;
                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        [ref, handler]
    );
}
