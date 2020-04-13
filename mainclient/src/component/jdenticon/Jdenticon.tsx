import React, {useRef, useEffect} from "react";
import jdenticon from 'jdenticon';

type JdenticonProps = {
    size: number;
    value: string;
}

const Jdenticon = (props: JdenticonProps) => {
    const {size, value} = props;
    const icon = useRef(null);

    useEffect(
        () => jdenticon.update(icon.current, value),
        [value]
    );

    return (
        <svg data-jdenticon-value={value} height={size} ref={icon} width={size}/>
    );
};

export default Jdenticon;