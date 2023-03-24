import { useState, useEffect } from 'react';

const useMouse = (ref) => {
    const [coords, setCoords] = useState({ x: 600, y: 300 });

    useEffect(() => {
        const handleWindowMouseMove = (event) => {
            setCoords({
                x: event.clientX,
                y: event.clientY,
            });
        };
        ref.current.onclick = (e) => { handleWindowMouseMove(e) };
    }, []);

    return coords;
}

export default useMouse;
